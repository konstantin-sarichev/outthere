// AI-powered recommendation system for OutThere
import { getNeighborhoodCoordinates } from "./neighborhoods"

export interface UserProfile {
  id: string
  name: string
  email?: string
  pronouns?: string
  interests: string[]
  neighborhood: string
  radius?: string
  availability: Record<string, string[]>
  groupSize?: 'small' | 'medium' | 'large'
  activityLevel?: 'low' | 'moderate' | 'high'
  bio: string
  ageRange: string // Changed from 'age' to 'ageRange'
  createdAt: string
  photos?: string[]
  preferences?: {
    groupSize?: 'small' | 'medium' | 'large'
    activityLevel?: 'low' | 'moderate' | 'high'
    noiseLevel?: 'low' | 'moderate' | 'high'
  }
}

export interface Event {
  id: string
  title: string
  description: string
  location: string
  neighborhood: string
  date: string
  time: string
  duration: number // in hours
  capacity: number
  attendees: number
  tags: string[]
  category: string
  difficulty: 'Easy' | 'Moderate' | 'Hard'
  activityLevel: 'low' | 'moderate' | 'high'
  groupSize: 'small' | 'medium' | 'large'
  creatorId: string
  lat?: number
  lng?: number
  isActive: boolean // Only show active events with real attendees
}

export interface Recommendation {
  event: Event
  score: number
  reasons: string[]
  matchType: 'perfect' | 'great' | 'good'
  confidence: number
}

export interface PersonalizedInvitation {
  id: string
  eventId: string
  userId: string
  message: string
  score: number
  reasons: string[]
  createdAt: string
  status: 'pending' | 'accepted' | 'declined' | 'expired'
}

// Updated mock events database with more realistic data
const mockEvents: Event[] = [
  // Only include events that have real activity
  {
    id: 'evt_1',
    title: 'Coffee & Code: Tech Meetup',
    description: 'Join fellow developers for coffee and casual coding discussions. Perfect for networking and sharing ideas.',
    location: 'Brooklyn Central Library',
    neighborhood: 'Prospect Heights',
    date: '2024-01-20',
    time: '10:00',
    duration: 2,
    capacity: 12,
    attendees: 0, // No real attendees yet
    tags: ['☕ Coffee', '💻 Tech', '📝 Writing'],
    category: 'Tech',
    difficulty: 'Easy',
    activityLevel: 'low',
    groupSize: 'medium',
    creatorId: 'user_123',
    lat: 40.6743,
    lng: -73.9656,
    isActive: false // Not active since no attendees
  },
  {
    id: 'evt_2',
    title: 'Morning Yoga in the Park',
    description: 'Start your weekend with a peaceful yoga session in beautiful Prospect Park. All levels welcome!',
    location: 'Prospect Park Meadow',
    neighborhood: 'Park Slope',
    date: '2024-01-21',
    time: '08:00',
    duration: 1.5,
    capacity: 20,
    attendees: 0, // No real attendees yet
    tags: ['🧘 Yoga', '🌱 Gardening', '🏔️ Hiking'],
    category: 'Fitness',
    difficulty: 'Easy',
    activityLevel: 'moderate',
    groupSize: 'large',
    creatorId: 'user_456',
    lat: 40.6602,
    lng: -73.9690,
    isActive: false // Not active since no attendees
  }
]

// Sample events for different NYC boroughs (will only show when they have attendees)
const additionalEvents: Event[] = [
  {
    id: 'evt_manhattan_1',
    title: 'Chess in Washington Square',
    description: 'Friendly chess games in the heart of Greenwich Village.',
    location: 'Washington Square Park',
    neighborhood: 'Greenwich Village',
    date: '2024-01-22',
    time: '14:00',
    duration: 2,
    capacity: 8,
    attendees: 0,
    tags: ['🧩 Puzzles', '🎯 Trivia', '☕ Coffee'],
    category: 'Games',
    difficulty: 'Easy',
    activityLevel: 'low',
    groupSize: 'small',
    creatorId: 'user_manhattan_1',
    lat: 40.7308,
    lng: -74.0020,
    isActive: false
  },
  {
    id: 'evt_queens_1',
    title: 'Food Tour in Astoria',
    description: 'Explore the diverse cuisine of Astoria with fellow foodies.',
    location: 'Astoria Food Market',
    neighborhood: 'Astoria',
    date: '2024-01-23',
    time: '18:00',
    duration: 3,
    capacity: 10,
    attendees: 0,
    tags: ['🍳 Cooking', '🍷 Wine', '🌱 Gardening'],
    category: 'Food',
    difficulty: 'Easy',
    activityLevel: 'moderate',
    groupSize: 'medium',
    creatorId: 'user_queens_1',
    lat: 40.7720,
    lng: -73.9301,
    isActive: false
  }
]

// Distance calculation helper
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8 // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Interest matching algorithm
function calculateInterestMatch(userInterests: string[], eventTags: string[]): number {
  const commonInterests = userInterests.filter(interest => 
    eventTags.some(tag => tag.toLowerCase().includes(interest.toLowerCase().replace(/[^\w\s]/gi, '')))
  )
  
  if (userInterests.length === 0) return 0
  return (commonInterests.length / userInterests.length) * 100
}

// Availability matching
function checkAvailabilityMatch(userAvailability: Record<string, string[]>, eventDate: string, eventTime: string): boolean {
  const eventDay = new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long' })
  const eventHour = parseInt(eventTime.split(':')[0])
  
  const userDaySlots = userAvailability[eventDay] || []
  
  // Map time to slots
  let timeSlot = 'Evening'
  if (eventHour < 12) timeSlot = 'Morning'
  else if (eventHour < 17) timeSlot = 'Afternoon'
  
  return userDaySlots.includes(timeSlot)
}

// Main recommendation engine
export function generateRecommendations(user: UserProfile, events: Event[] = [...mockEvents, ...additionalEvents]): Recommendation[] {
  const recommendations: Recommendation[] = []
  
  // Only consider active events with real attendees
  const activeEvents = events.filter(event => event.isActive && event.attendees > 0)
  
  // If no active events, return empty recommendations
  if (activeEvents.length === 0) {
    return []
  }
  
  // User location coordinates using the new neighborhoods system
  const userCoords = getNeighborhoodCoordinates(user.neighborhood)
  
  if (!userCoords) {
    console.warn(`Coordinates not found for neighborhood: ${user.neighborhood}`)
    return []
  }
  
  for (const event of activeEvents) {
    if (!event.lat || !event.lng) continue
    
    // Calculate various matching factors
    const interestScore = calculateInterestMatch(user.interests, event.tags)
    const availabilityMatch = checkAvailabilityMatch(user.availability, event.date, event.time)
    const distance = calculateDistance(userCoords.lat, userCoords.lng, event.lat, event.lng)
    const maxDistance = parseInt(user.radius || "2") || 2
    
    // Skip if too far
    if (distance > maxDistance) continue
    
    // Skip if not available
    if (!availabilityMatch) continue
    
    // Group size preference matching
    const groupSizeMatch = user.groupSize === event.groupSize
    const activityLevelMatch = user.activityLevel === event.activityLevel
    
    // Calculate final score
    let score = 0
    let reasons: string[] = []
    
    // Interest matching (40% weight)
    score += (interestScore / 100) * 40
    if (interestScore > 50) {
      reasons.push(`${Math.round(interestScore)}% interest match`)
    }
    
    // Availability (30% weight)
    if (availabilityMatch) {
      score += 30
      reasons.push('Available at this time')
    }
    
    // Distance (15% weight)
    const distanceScore = Math.max(0, (maxDistance - distance) / maxDistance) * 15
    score += distanceScore
    if (distance < 1) {
      reasons.push('Very close to you')
    } else if (distance < 2) {
      reasons.push('Close to your area')
    }
    
    // Group size preference (10% weight)
    if (groupSizeMatch) {
      score += 10
      reasons.push('Perfect group size for you')
    }
    
    // Activity level (5% weight)
    if (activityLevelMatch) {
      score += 5
      reasons.push('Matches your activity level')
    }
    
    // Determine match type and confidence
    let matchType: 'perfect' | 'great' | 'good' = 'good'
    let confidence = score
    
    if (score >= 80) {
      matchType = 'perfect'
      confidence = Math.min(95, score)
    } else if (score >= 60) {
      matchType = 'great'
      confidence = Math.min(85, score)
    }
    
    // Only include recommendations with decent scores
    if (score >= 40) {
      recommendations.push({
        event,
        score: Math.round(score),
        reasons,
        matchType,
        confidence: Math.round(confidence)
      })
    }
  }
  
  // Sort by score descending
  return recommendations.sort((a, b) => b.score - a.score)
}

// Generate personalized invitation messages
export function generateInvitationMessage(recommendation: Recommendation, user: UserProfile): string {
  const { event, reasons, matchType } = recommendation
  
  const templates = {
    perfect: [
      `Hi ${user.name}! 🌟 We found the perfect event for you: "${event.title}". ${reasons[0]} and it's exactly what you're looking for!`,
      `${user.name}, this looks like it was made for you! "${event.title}" - ${reasons.slice(0, 2).join(' and ')}.`,
      `Hey ${user.name}! ✨ "${event.title}" is happening near you and we think you'll love it. ${reasons[0]}!`
    ],
    great: [
      `Hi ${user.name}! We think you'd really enjoy "${event.title}". ${reasons[0]} and ${reasons[1] || 'it looks like a great fit'}.`,
      `${user.name}, check out "${event.title}" - ${reasons[0]} and it's in your area!`,
      `Hey ${user.name}! "${event.title}" caught our attention for you. ${reasons.slice(0, 2).join(' and ')}.`
    ],
    good: [
      `Hi ${user.name}, "${event.title}" might interest you. ${reasons[0] || 'It matches some of your preferences'}.`,
      `${user.name}, we found "${event.title}" in your area. ${reasons[0] || 'Thought you might like it'}!`,
      `Hey ${user.name}, "${event.title}" is happening nearby. ${reasons[0] || 'Worth checking out'}!`
    ]
  }
  
  const templateOptions = templates[matchType]
  const randomTemplate = templateOptions[Math.floor(Math.random() * templateOptions.length)]
  
  return randomTemplate
}

// Create personalized invitations - only for active events
export function createPersonalizedInvitations(user: UserProfile): PersonalizedInvitation[] {
  const recommendations = generateRecommendations(user)
  const invitations: PersonalizedInvitation[] = []
  
  // Only create invitations if there are actual recommendations
  if (recommendations.length === 0) {
    return []
  }
  
  // Create invitations for top 3-5 recommendations
  const topRecommendations = recommendations.slice(0, Math.min(5, recommendations.length))
  
  for (const recommendation of topRecommendations) {
    const message = generateInvitationMessage(recommendation, user)
    
    invitations.push({
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      eventId: recommendation.event.id,
      userId: user.id,
      message,
      score: recommendation.score,
      reasons: recommendation.reasons,
      createdAt: new Date().toISOString(),
      status: 'pending'
    })
  }
  
  return invitations
}

// Get daily recommendations for a user - only active events
export function getDailyRecommendations(user: UserProfile): Recommendation[] {
  const allRecommendations = generateRecommendations(user)
  
  // Filter for events happening in the next 7 days
  const now = new Date()
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  
  const upcomingRecommendations = allRecommendations.filter(rec => {
    const eventDate = new Date(rec.event.date)
    return eventDate >= now && eventDate <= nextWeek
  })
  
  return upcomingRecommendations.slice(0, 3) // Return top 3 for today
}

// Function to simulate adding real attendees to events (for testing)
export function activateEvent(eventId: string, attendeeCount: number = 1): void {
  const allEvents = [...mockEvents, ...additionalEvents]
  const event = allEvents.find(e => e.id === eventId)
  if (event) {
    event.attendees = attendeeCount
    event.isActive = true
  }
}

// Function to get all events (for admin/testing purposes)
export function getAllEvents(): Event[] {
  return [...mockEvents, ...additionalEvents]
}

// Mock function to simulate AI learning from user behavior
export function updateUserPreferences(user: UserProfile, eventId: string, action: 'joined' | 'declined' | 'interested'): UserProfile {
  // In a real app, this would update user preferences based on their actions
  // For now, we'll just return the same user
  console.log(`User ${user.id} ${action} event ${eventId}`)
  return user
} 