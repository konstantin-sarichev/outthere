'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { 
  Calendar as CalendarIcon,
  Clock,
  Save,
  ArrowLeft,
  Plus,
  X,
  Check,
  AlertCircle
} from "lucide-react"
import { UserProfile } from "@/lib/ai-recommendations"

const timeSlots = [
  { day: "Monday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Tuesday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Wednesday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Thursday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Friday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Saturday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Sunday", slots: ["Morning", "Afternoon", "Evening"] }
]

const timeSlotDetails = {
  "Morning": "8:00 AM - 12:00 PM",
  "Afternoon": "12:00 PM - 6:00 PM", 
  "Evening": "6:00 PM - 11:00 PM"
}

export default function CalendarPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [availability, setAvailability] = useState<Record<string, string[]>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('outthereUser')
    if (!userData) {
      router.push('/signup')
      return
    }
    
    const parsedUser = JSON.parse(userData) as UserProfile
    setUser(parsedUser)
    setAvailability(parsedUser.availability || {})
  }, [router])

  const handleAvailabilityToggle = (day: string, slot: string) => {
    setAvailability(prev => {
      const daySlots = prev[day] || []
      const newDaySlots = daySlots.includes(slot)
        ? daySlots.filter(s => s !== slot)
        : [...daySlots, slot]
      
      const newAvailability = {
        ...prev,
        [day]: newDaySlots
      }
      
      setHasChanges(true)
      return newAvailability
    })
  }

  const handleSelectAll = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: timeSlots.find(ts => ts.day === day)?.slots || []
    }))
    setHasChanges(true)
  }

  const handleClearDay = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: []
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    if (!user) return
    
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const updatedUser = {
      ...user,
      availability
    }
    
    localStorage.setItem('outthereUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setHasChanges(false)
    setIsSaving(false)
  }

  const getTotalAvailableSlots = () => {
    return Object.values(availability).reduce((total, slots) => total + slots.length, 0)
  }

  const getAvailabilityPercentage = () => {
    const totalSlots = timeSlots.length * 3 // 7 days * 3 time slots
    const availableSlots = getTotalAvailableSlots()
    return Math.round((availableSlots / totalSlots) * 100)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <Header currentPage="calendar" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Your Availability</h1>
              <p className="text-xl text-orange-100">Let us know when you're free for meetups</p>
            </div>
            {hasChanges && (
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600 mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Availability Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Available Slots</p>
                  <p className="text-3xl font-bold text-gray-900">{getTotalAvailableSlots()}</p>
                  <p className="text-sm text-gray-500">out of 21 total</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Availability</p>
                  <p className="text-3xl font-bold text-gray-900">{getAvailabilityPercentage()}%</p>
                  <p className="text-sm text-gray-500">of the week</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Recommendations</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-500">this week</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg">
                  <Plus className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 mb-1">How this works</p>
                <p className="text-blue-700 text-sm">
                  Select the times when you're typically available for meetups. We'll use this to suggest events and send you personalized invitations that match your schedule.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Availability Grid */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Weekly Availability
            </CardTitle>
            <CardDescription>
              Click on time slots to mark when you're available for events
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {timeSlots.map((day) => (
                <div key={day.day} className="border rounded-lg p-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{day.day}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSelectAll(day.day)}
                        className="text-xs"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        All
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClearDay(day.day)}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {day.slots.map((slot) => {
                      const isSelected = availability[day.day]?.includes(slot)
                      return (
                        <button
                          key={slot}
                          onClick={() => handleAvailabilityToggle(day.day, slot)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                          }`}
                        >
                          <div className="font-medium text-sm mb-1">{slot}</div>
                          <div className="text-xs text-gray-500">
                            {timeSlotDetails[slot as keyof typeof timeSlotDetails]}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Show selected slots count */}
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {availability[day.day]?.length || 0} of 3 slots selected
                    </Badge>
                    {availability[day.day]?.length === 3 && (
                      <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                        Fully available
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 h-12 px-8"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving Changes...
                  </>
                ) : hasChanges ? (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Availability
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    All Changes Saved
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">💡 Tips for Better Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-900 mb-1">Be realistic</p>
                <p>Only mark times when you're genuinely available and interested in meeting people.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Stay flexible</p>
                <p>Having more availability increases your chances of finding great matches.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Update regularly</p>
                <p>Your schedule changes - update your availability to get the most relevant recommendations.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Quality over quantity</p>
                <p>It's better to be available for fewer times that work well for you than to overcommit.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 