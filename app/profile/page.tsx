'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { 
  User, 
  MapPin, 
  Camera, 
  Save,
  ArrowLeft,
  Settings,
  Bell,
  Shield,
  Heart
} from "lucide-react"
import { neighborhoodsByBorough } from "@/lib/neighborhoods"
import { UserProfile } from "@/lib/ai-recommendations"

const interests = [
  "☕ Coffee", "🏃 Running", "📚 Reading", "🎲 Board Games", "🎨 Art", "🎵 Music",
  "🍳 Cooking", "📸 Photography", "🧘 Yoga", "🚴 Cycling", "🎭 Theater", "🍷 Wine",
  "🏔️ Hiking", "💻 Tech", "🎯 Trivia", "🏊 Swimming", "🎪 Comedy", "🌱 Gardening",
  "📝 Writing", "🎸 Guitar", "🏀 Basketball", "🎨 Painting", "🧩 Puzzles", "🍺 Craft Beer",
  "🎳 Bowling", "🏓 Table Tennis", "🎤 Karaoke", "🧗 Rock Climbing", "⛸️ Ice Skating", "🎲 Video Games"
]

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    neighborhood: "",
    radius: "2",
    interests: [] as string[],
    groupSize: "small" as "small" | "medium" | "large",
    activityLevel: "moderate" as "low" | "moderate" | "high",
    age: "",
    pronouns: ""
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('outthereUser')
    if (!userData) {
      router.push('/signup')
      return
    }
    
    const parsedUser = JSON.parse(userData) as UserProfile
    setUser(parsedUser)
    setFormData({
      name: parsedUser.name,
      email: parsedUser.email || "",
      bio: parsedUser.bio,
      neighborhood: parsedUser.neighborhood,
      radius: parsedUser.radius || "2",
      interests: parsedUser.interests,
      groupSize: (parsedUser.groupSize || "small") as "small" | "medium" | "large",
      activityLevel: (parsedUser.activityLevel || "moderate") as "low" | "moderate" | "high",
      age: parsedUser.ageRange || "",
      pronouns: parsedUser.pronouns || ""
    })
  }, [router])

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSave = async () => {
    if (!user) return
    
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const updatedUser = {
      ...user,
      ...formData
    }
    
    localStorage.setItem('outthereUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
    setIsSaving(false)
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
      <Header currentPage="profile" />

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
              <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
              <p className="text-xl text-orange-100">Manage your information and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-gradient-to-r from-orange-400 to-red-400 text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                  disabled={!isEditing}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    {user.pronouns && (
                      <p className="text-gray-600">({user.pronouns})</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{user.neighborhood}</span>
                      <Badge variant="outline" className="text-xs">{user.ageRange}</Badge>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Information */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pronouns">Pronouns</Label>
                    <Input
                      id="pronouns"
                      value={formData.pronouns}
                      onChange={(e) => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="they/them, she/her, he/him"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1 min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="neighborhood">Neighborhood</Label>
                    <select
                      id="neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
                    >
                      <option value="">Select neighborhood</option>
                      {Object.entries(neighborhoodsByBorough).map(([borough, neighborhoods]) => (
                        <optgroup key={borough} label={borough}>
                          {neighborhoods.map(neighborhood => (
                            <option key={neighborhood.name} value={neighborhood.name}>
                              {neighborhood.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="radius">Travel Distance</Label>
                    <select
                      id="radius"
                      value={formData.radius}
                      onChange={(e) => setFormData(prev => ({ ...prev, radius: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
                    >
                      <option value="1">1 mile</option>
                      <option value="2">2 miles</option>
                      <option value="5">5 miles</option>
                      <option value="10">10 miles</option>
                      <option value="15">Anywhere in NYC</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Your Interests
                </CardTitle>
                <CardDescription>
                  Select your interests to get better event recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => isEditing && handleInterestToggle(interest)}
                      disabled={!isEditing}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.interests.includes(interest)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white text-gray-700'
                      } ${isEditing ? 'hover:border-orange-300 cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preferences */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Preferred Group Size</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {[
                      { value: 'small', label: 'Small (2-4)' },
                      { value: 'medium', label: 'Medium (5-8)' },
                      { value: 'large', label: 'Large (9+)' }
                    ].map((size) => (
                      <button
                        key={size.value}
                        onClick={() => isEditing && setFormData(prev => ({ ...prev, groupSize: size.value as "small" | "medium" | "large" }))}
                        disabled={!isEditing}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.groupSize === size.value
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 bg-white text-gray-700'
                        } ${isEditing ? 'hover:border-orange-300 cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Activity Level</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {[
                      { value: 'low', label: 'Chill' },
                      { value: 'moderate', label: 'Moderate' },
                      { value: 'high', label: 'High Energy' }
                    ].map((level) => (
                      <button
                        key={level.value}
                        onClick={() => isEditing && setFormData(prev => ({ ...prev, activityLevel: level.value as "low" | "moderate" | "high" }))}
                        disabled={!isEditing}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.activityLevel === level.value
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 bg-white text-gray-700'
                        } ${isEditing ? 'hover:border-orange-300 cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interests</span>
                  <span className="font-medium">{user.interests.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Events joined</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Connections made</span>
                  <span className="font-medium">0</span>
                </div>
              </CardContent>
            </Card>

            {/* Settings Links */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start text-left">
                  <Bell className="h-4 w-4 mr-3" />
                  Notification Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left">
                  <Shield className="h-4 w-4 mr-3" />
                  Privacy & Safety
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left text-red-600 hover:text-red-700 hover:bg-red-50">
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cancel Editing */}
        {isEditing && (
          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false)
                // Reset form data
                setFormData({
                  name: user.name,
                  email: user.email || "",
                  bio: user.bio,
                  neighborhood: user.neighborhood,
                  radius: user.radius || "2",
                  interests: user.interests,
                  groupSize: user.groupSize || "small",
                  activityLevel: user.activityLevel || "moderate",
                  age: user.ageRange,
                  pronouns: user.pronouns || ""
                })
              }}
            >
              Cancel Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 