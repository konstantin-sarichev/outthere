'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/Header"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  MapPin,
  Clock,
  Users,
  Calendar,
  Heart,
  Sparkles,
  CheckCircle,
  X,
  ThumbsUp,
  Star,
  Zap,
  Gift,
  Plus,
  ArrowRight,
  Settings,
  CalendarDays,
  UserPlus
} from "lucide-react"
import {
  generateRecommendations,
  createPersonalizedInvitations,
  getDailyRecommendations,
  PersonalizedInvitation,
  Recommendation
} from "@/lib/ai-recommendations"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [invitations, setInvitations] = useState<PersonalizedInvitation[]>([])
  const [showOnboardingSuccess, setShowOnboardingSuccess] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening"

  useEffect(() => {
    // Check if user just completed onboarding
    if (searchParams.get('onboarding') === 'complete') {
      setShowOnboardingSuccess(true)
      // Remove the query parameter after showing success
      window.history.replaceState({}, '', '/dashboard')
    }
  }, [searchParams])

  useEffect(() => {
    // Redirect to signup if not authenticated
    if (!isLoading && !user) {
      router.push('/signup')
      return
    }

    // Generate AI recommendations when user is available
    if (user) {
      try {
        // Generate AI recommendations (will be empty since no active events)
        const userRecommendations = getDailyRecommendations(user)
        setRecommendations(userRecommendations)

        // Generate personalized invitations (will be empty since no active events)
        const userInvitations = createPersonalizedInvitations(user)
        setInvitations(userInvitations)
      } catch (error) {
        console.error('Error generating recommendations:', error)
      }
    }
  }, [user, isLoading, router])

  const handleInvitationAction = (invitationId: string, action: 'accept' | 'decline') => {
    setInvitations(prev =>
      prev.map(inv =>
        inv.id === invitationId
          ? { ...inv, status: action === 'accept' ? 'accepted' : 'declined' }
          : inv
      )
    )
  }

  const pendingInvitations = invitations.filter(inv => inv.status === 'pending')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
        <Header currentPage="dashboard" />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
        <Header currentPage="dashboard" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <Header currentPage="dashboard" />

      {/* Onboarding Success Banner */}
      {showOnboardingSuccess && (
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Welcome to OutThere! 🎉</p>
                  <p className="text-emerald-100 text-sm">Your profile is set up and we're ready to find great matches for you!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOnboardingSuccess(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{greeting}, {user.name}! 👋</h1>
              <p className="text-xl text-orange-100">
                Here's what's happening in {user.neighborhood} this week
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{recommendations.length}</div>
                <div className="text-sm text-orange-200">AI Picks Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{pendingInvitations.length}</div>
                <div className="text-sm text-orange-200">New Invitations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Invitations Section */}
        {pendingInvitations.length > 0 ? (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Personal Invitations</h2>
              <Badge className="bg-purple-100 text-purple-800">AI Powered</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              {pendingInvitations.slice(0, 2).map((invitation) => {
                const event = recommendations.find(r => r.event.id === invitation.eventId)?.event
                if (!event) return null

                return (
                  <Card key={invitation.id} className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl">
                          <Zap className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-purple-500 text-white text-xs">
                              {invitation.score}% match
                            </Badge>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            {invitation.message}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {invitation.reasons.map((reason, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                                {reason}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleInvitationAction(invitation.id, 'accept')}
                              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleInvitationAction(invitation.id, 'decline')}
                            >
                              Not now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ) : null}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Events Near You</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-500">this week</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">People Nearby</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-500">active now</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Your Availability</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Object.values(user.availability || {}).reduce((total, slots) => total + slots.length, 0)}
                  </p>
                  <p className="text-sm text-gray-500">time slots</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Your Interests</p>
                  <p className="text-3xl font-bold text-gray-900">{user.interests.length}</p>
                  <p className="text-sm text-gray-500">selected</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Events for You</h2>
                <Badge className="bg-orange-100 text-orange-800">AI Powered</Badge>
              </div>
              <Button variant="outline" asChild className="hover:bg-gray-50">
                <Link href="/events">View All Events</Link>
              </Button>
            </div>

            {/* Empty State for Events */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarDays className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We're still building our community. Once people start creating events in your area, 
                  we'll show you the perfect matches here.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500">
                    <Link href="/events">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Event
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/calendar">
                      <Calendar className="h-4 w-4 mr-2" />
                      Set Availability
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Profile Summary */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{user.neighborhood}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interests</span>
                  <span className="font-medium">{user.interests.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/calendar">
                    <Calendar className="h-4 w-4 mr-3" />
                    Update Availability
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/events">
                    <Plus className="h-4 w-4 mr-3" />
                    Create Event
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <UserPlus className="h-4 w-4 mr-3" />
                  Invite Friends
                  <Badge className="ml-auto bg-gray-100 text-gray-600 text-xs">Soon</Badge>
                </Button>
              </CardContent>
            </Card>

            {/* Getting Started Tips */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-blue-900">💡 Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Profile completed</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-4 w-4 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                  <span>Create your first event</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-4 w-4 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                  <span>Join an event in your area</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-4 w-4 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                  <span>Make your first connection</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 