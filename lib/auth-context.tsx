'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserProfile } from './ai-recommendations'
import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: UserProfile | null
  supabaseUser: User | null
  isLoading: boolean
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (userData: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setIsLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSupabaseUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          user_interests!inner(tag),
          availability(*)
        `)
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        // Create a fallback user profile for first-time users
        const fallbackUser: UserProfile = {
          id: userId,
          name: '',
          email: supabaseUser?.email || '',
          neighborhood: '',
          interests: [],
          ageRange: '',
          bio: '',
          photos: [],
          availability: {},
          preferences: {
            groupSize: 'small',
            activityLevel: 'moderate',
            noiseLevel: 'moderate'
          },
          createdAt: new Date().toISOString()
        }
        setUser(fallbackUser)
      } else {
        // Transform database user to UserProfile format
        const transformedUser: UserProfile = {
          id: data.id,
          name: data.name || '',
          email: supabaseUser?.email || '',
          neighborhood: data.neighborhood || '',
          interests: data.user_interests?.map((ui: any) => ui.tag) || [],
          ageRange: data.age_range || '',
          bio: data.bio || '',
          photos: data.photos || [],
          availability: transformAvailability(data.availability || []),
          preferences: data.preferences || {
            groupSize: 'small',
            activityLevel: 'moderate',
            noiseLevel: 'moderate'
          },
          createdAt: data.created_at
        }
        setUser(transformedUser)
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const transformAvailability = (availability: any[]) => {
    const result: { [key: string]: string[] } = {}
    availability.forEach((slot) => {
      const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][slot.weekday]
      const timeSlot = `${Math.floor(slot.start_minute / 60)}:${(slot.start_minute % 60).toString().padStart(2, '0')}-${Math.floor(slot.end_minute / 60)}:${(slot.end_minute % 60).toString().padStart(2, '0')}`
      if (!result[day]) result[day] = []
      result[day].push(timeSlot)
    })
    return result
  }

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Create user profile in database
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            name: userData.name || '',
            age_range: userData.ageRange || '',
            bio: userData.bio || '',
            neighborhood: userData.neighborhood || '',
            preferences: userData.preferences || {}
          })

        if (profileError) {
          console.error('Error creating user profile:', profileError)
        }

        toast.success('Account created successfully! Please check your email to verify your account.')
      }
    } catch (error: any) {
      console.error('Error signing up:', error)
      toast.error(error.message || 'Failed to create account')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success('Welcome back!')
    } catch (error: any) {
      console.error('Error signing in:', error)
      toast.error(error.message || 'Failed to sign in')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setUser(null)
      setSupabaseUser(null)
      toast.success('Signed out successfully')
    } catch (error: any) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    }
  }

  const updateUser = async (userData: Partial<UserProfile>) => {
    if (!supabaseUser) return

    try {
      setIsLoading(true)
      
      // Update user profile
      const { error: profileError } = await supabase
        .from('users')
        .update({
          name: userData.name,
          age_range: userData.ageRange,
          bio: userData.bio,
          neighborhood: userData.neighborhood,
          preferences: userData.preferences,
          photos: userData.photos
        })
        .eq('id', supabaseUser.id)

      if (profileError) throw profileError

      // Update interests if provided
      if (userData.interests) {
        // Delete existing interests
        await supabase
          .from('user_interests')
          .delete()
          .eq('user_id', supabaseUser.id)

        // Insert new interests
        if (userData.interests.length > 0) {
          const { error: interestsError } = await supabase
            .from('user_interests')
            .insert(
              userData.interests.map(tag => ({
                user_id: supabaseUser.id,
                tag
              }))
            )

          if (interestsError) throw interestsError
        }
      }

      // Update availability if provided
      if (userData.availability) {
        // Delete existing availability
        await supabase
          .from('availability')
          .delete()
          .eq('user_id', supabaseUser.id)

        // Insert new availability
        const availabilityRecords: any[] = []
        Object.entries(userData.availability).forEach(([day, slots]) => {
          const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day)
          slots.forEach(slot => {
            const [start, end] = slot.split('-')
            const [startHour, startMin] = start.split(':').map(Number)
            const [endHour, endMin] = end.split(':').map(Number)
            availabilityRecords.push({
              user_id: supabaseUser.id,
              weekday,
              start_minute: startHour * 60 + startMin,
              end_minute: endHour * 60 + endMin
            })
          })
        })

        if (availabilityRecords.length > 0) {
          const { error: availabilityError } = await supabase
            .from('availability')
            .insert(availabilityRecords)

          if (availabilityError) throw availabilityError
        }
      }

      // Fetch updated profile
      await fetchUserProfile(supabaseUser.id)
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      console.error('Error updating user:', error)
      toast.error('Failed to update profile')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      supabaseUser, 
      isLoading, 
      signUp, 
      signIn, 
      signOut, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 