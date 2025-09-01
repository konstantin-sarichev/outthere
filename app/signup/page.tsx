'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Heart,
  Sparkles,
  CheckCircle,
  Camera,
  Calendar
} from "lucide-react"
import { neighborhoodsByBorough } from "@/lib/neighborhoods"
import { useAuth } from "@/lib/auth-context"

const interests = [
  "☕ Coffee", "🏃 Running", "📚 Reading", "🎲 Board Games", "🎨 Art", "🎵 Music",
  "🍳 Cooking", "📸 Photography", "🧘 Yoga", "🚴 Cycling", "🎭 Theater", "🍷 Wine",
  "🏔️ Hiking", "💻 Tech", "🎯 Trivia", "🏊 Swimming", "🎪 Comedy", "🌱 Gardening",
  "📝 Writing", "🎸 Guitar", "🏀 Basketball", "🎨 Painting", "🧩 Puzzles", "🍺 Craft Beer",
  "🎳 Bowling", "🏓 Table Tennis", "🎤 Karaoke", "🧗 Rock Climbing", "⛸️ Ice Skating", "🎲 Video Games"
]

const timeSlots = [
  { day: "Monday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Tuesday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Wednesday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Thursday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Friday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Saturday", slots: ["Morning", "Afternoon", "Evening"] },
  { day: "Sunday", slots: ["Morning", "Afternoon", "Evening"] }
]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    ageRange: "",
    pronouns: "",
    bio: "",
    neighborhood: "",
    radius: "2",
    interests: [] as string[],
    availability: {} as Record<string, string[]>,
    groupSize: "small" as "small" | "medium" | "large",
    activityLevel: "moderate" as "low" | "moderate" | "high",
    profilePhoto: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { signUp } = useAuth()
  const router = useRouter()

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleAvailabilityToggle = (day: string, slot: string) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: prev.availability[day]?.includes(slot)
          ? prev.availability[day].filter(s => s !== slot)
          : [...(prev.availability[day] || []), slot]
      }
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (!formData.ageRange) newErrors.ageRange = "Age range is required"
    if (!formData.neighborhood) newErrors.neighborhood = "Neighborhood is required"
    if (formData.interests.length < 3) newErrors.interests = "Please select at least 3 interests"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      
      // Prepare user data
      const userData = {
        name: formData.name,
        ageRange: formData.ageRange,
        bio: formData.bio,
        neighborhood: formData.neighborhood,
        interests: formData.interests,
        availability: formData.availability,
        preferences: {
          groupSize: formData.groupSize,
          activityLevel: formData.activityLevel,
          noiseLevel: 'moderate' as 'low' | 'moderate' | 'high'
        }
      }
      
      // Sign up with Supabase
      await signUp(formData.email, formData.password, userData)
      
      // Redirect to dashboard with onboarding complete
      router.push('/dashboard?onboarding=complete')
    } catch (error) {
      console.error('Signup error:', error)
      // Error handling is done in the auth context with toasts
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const stepTitles = [
    "Let's get started",
    "Tell us about yourself", 
    "What are you into?",
    "When are you free?",
    "Almost done!"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              OutThere
            </Link>
            <div className="text-sm text-gray-600">
              Step {step} of 5
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{stepTitles[step - 1]}</h1>
            <span className="text-sm text-gray-500">{step}/5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Welcome to OutThere!</h2>
                  <p className="text-gray-600">Let's create your profile so we can help you meet amazing people</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your first name"
                      className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="pronouns">Pronouns (optional)</Label>
                    <Input
                      id="pronouns"
                      value={formData.pronouns}
                      onChange={(e) => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
                      placeholder="they/them, she/her, he/him"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Create a secure password"
                    className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="age">Age Range *</Label>
                                      <select
                      id="age"
                      value={formData.ageRange}
                      onChange={(e) => setFormData(prev => ({ ...prev, ageRange: e.target.value }))}
                      className={`mt-1 w-full rounded-lg border bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.ageRange ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                    <option value="">Select age range</option>
                    <option value="18-24">18-24</option>
                    <option value="25-29">25-29</option>
                    <option value="30-34">30-34</option>
                    <option value="35-39">35-39</option>
                    <option value="40+">40+</option>
                  </select>
                  {errors.ageRange && <p className="text-red-500 text-sm mt-1">{errors.ageRange}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Bio & Location */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Tell us about yourself</h2>
                  <p className="text-gray-600">Help others get to know you better</p>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us a bit about yourself - what do you like to do? What brings you joy? What are you looking to get out of meeting new people?"
                    className="mt-1 min-h-[120px]"
                  />
                  <p className="text-sm text-gray-500 mt-1">This helps us match you with like-minded people</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="neighborhood">Neighborhood *</Label>
                    <select
                      id="neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
                      className={`mt-1 w-full rounded-lg border bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.neighborhood ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select your neighborhood</option>
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
                    {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>}
                  </div>
                  <div>
                    <Label htmlFor="radius">Travel Distance</Label>
                    <select
                      id="radius"
                      value={formData.radius}
                      onChange={(e) => setFormData(prev => ({ ...prev, radius: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="1">1 mile</option>
                      <option value="2">2 miles</option>
                      <option value="5">5 miles</option>
                      <option value="10">10 miles</option>
                      <option value="15">Anywhere in NYC</option>
                    </select>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-900">Privacy First</p>
                      <p className="text-sm text-orange-700">We only share your general neighborhood, never your exact address. Event locations are revealed when you RSVP.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">What are you into?</h2>
                  <p className="text-gray-600">Select at least 3 interests so we can match you with the right people and events</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Selected: {formData.interests.length} interests
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.interests.length > 0 && (
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <p className="text-sm font-medium text-emerald-900 mb-2">Your interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map((interest) => (
                        <Badge key={interest} className="bg-emerald-100 text-emerald-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {errors.interests && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 text-sm">{errors.interests}</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Availability */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">When are you free?</h2>
                  <p className="text-gray-600">Help us suggest events when you're available</p>
                </div>

                <div className="space-y-4">
                  {timeSlots.map((day) => (
                    <div key={day.day} className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">{day.day}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {day.slots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => handleAvailabilityToggle(day.day, slot)}
                            className={`p-2 rounded text-sm font-medium transition-all ${
                              formData.availability[day.day]?.includes(slot)
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Preferred Group Size</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        { value: 'small', label: 'Small (2-4)' },
                        { value: 'medium', label: 'Medium (5-8)' },
                        { value: 'large', label: 'Large (9+)' }
                      ].map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setFormData(prev => ({ ...prev, groupSize: size.value as "small" | "medium" | "large" }))}
                          className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                            formData.groupSize === size.value
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Activity Level</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        { value: 'low', label: 'Chill' },
                        { value: 'moderate', label: 'Moderate' },
                        { value: 'high', label: 'High Energy' }
                      ].map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setFormData(prev => ({ ...prev, activityLevel: level.value as "low" | "moderate" | "high" }))}
                          className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                            formData.activityLevel === level.value
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                          }`}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Final */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">You're all set!</h2>
                  <p className="text-gray-600">Ready to start meeting amazing people?</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg border">
                  <h3 className="font-semibold text-gray-900 mb-4">Here's what happens next:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">AI matches you with events</p>
                        <p className="text-sm text-gray-600">Based on your interests and availability</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Get personalized invitations</p>
                        <p className="text-sm text-gray-600">We'll invite you to events you'll love</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Meet your people</p>
                        <p className="text-sm text-gray-600">Start building real friendships</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 h-12 px-8 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating your profile...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              {step < 5 && (
                <Button
                  onClick={nextStep}
                  disabled={
                    (step === 1 && (!formData.name || !formData.email || !formData.password || !formData.ageRange)) ||
                    (step === 2 && !formData.neighborhood) ||
                    (step === 3 && formData.interests.length < 3)
                  }
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 