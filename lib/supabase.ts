import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  name: string
  age_range: string
  pronouns?: string
  bio: string
  neighborhood: string
  radius_km: number
  photos: string[]
  socials?: Record<string, any>
  preferences?: Record<string, any>
  created_at: string
}

export interface UserInterest {
  user_id: string
  tag: string
}

export interface Availability {
  user_id: string
  weekday: number
  start_minute: number
  end_minute: number
  recurrence: string
}

export interface Venue {
  id: string
  name: string
  place_id?: string
  lat: number
  lng: number
  categories: string[]
  noise_level?: number
  price_tier?: number
}

export interface Event {
  id: string
  creator_id: string
  title: string
  description: string
  venue_id: string
  start_ts: string
  end_ts: string
  capacity: number
  visibility: string
  tags: string[]
  status: string
}

export interface EventAttendee {
  event_id: string
  user_id: string
  rsvp_status: string
  joined_ts: string
}

export interface Match {
  id: string
  user_id: string
  other_user_id: string
  score: number
  created_at: string
} 