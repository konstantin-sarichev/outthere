'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/Header"
import MapView from "@/components/MapView"
import Link from "next/link"
import { 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  Filter,
  Search,
  Heart,
  Share2,
  Eye
} from "lucide-react"

// Enhanced mock data with better structure
const mockEvents = [
  {
    id: "1",
    title: "Coffee & Chat for Newcomers",
    description: "Casual coffee meetup for people new to the area. Great way to meet locals and get neighborhood tips! We'll share stories, recommendations, and help you feel at home in Brooklyn.",
    location: "Café Luna, Williamsburg",
    address: "123 Bedford Ave, Brooklyn, NY",
    time: "Today, 3:00 PM - 5:00 PM",
    date: "Today",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    attendees: 4,
    capacity: 6,
    tags: ["coffee", "newcomers", "casual", "networking"],
    creator: {
      name: "Sarah M.",
      avatar: "",
      initials: "SM"
    },
    price: "Free",
    priceValue: 0,
    lat: 40.7181,
    lng: -73.9571,
    image: "/api/placeholder/400/200",
    category: "Social",
    difficulty: "Easy",
    rsvpDeadline: "1 hour before"
  },
  {
    id: "2", 
    title: "Board Games & Beers",
    description: "Weekly board game night at Brooklyn Brewery. We have a great collection of games from strategy to party games. Drinks and light snacks available for purchase. All skill levels welcome!",
    location: "Brooklyn Brewery",
    address: "79 N 11th St, Brooklyn, NY",
    time: "Thursday, 7:00 PM - 10:00 PM",
    date: "Thursday",
    startTime: "7:00 PM",
    endTime: "10:00 PM",
    attendees: 6,
    capacity: 8,
    tags: ["games", "beer", "weekly", "indoor"],
    creator: {
      name: "Mike R.",
      avatar: "",
      initials: "MR"
    },
    price: "$15",
    priceValue: 15,
    lat: 40.7208,
    lng: -73.9578,
    image: "/api/placeholder/400/200",
    category: "Games",
    difficulty: "Easy",
    rsvpDeadline: "2 hours before"
  },
  {
    id: "3",
    title: "Morning Run Club",
    description: "5K run through beautiful Prospect Park. All fitness levels welcome! We'll have different pace groups so everyone can participate comfortably. Post-run coffee optional but encouraged!",
    location: "Prospect Park",
    address: "Prospect Park, Brooklyn, NY",
    time: "Saturday, 8:00 AM - 10:00 AM",
    date: "Saturday",
    startTime: "8:00 AM", 
    endTime: "10:00 AM",
    attendees: 8,
    capacity: 12,
    tags: ["running", "fitness", "outdoors", "health"],
    creator: {
      name: "Emma L.",
      avatar: "",
      initials: "EL"
    },
    price: "Free",
    priceValue: 0,
    lat: 40.6602,
    lng: -73.9690,
    image: "/api/placeholder/400/200",
    category: "Fitness",
    difficulty: "Moderate",
    rsvpDeadline: "Night before"
  },
  {
    id: "4",
    title: "Book Club: Sci-Fi Edition",
    description: "Monthly book discussion focused on science fiction. This month we're reading 'The Left Hand of Darkness' by Ursula K. Le Guin. Deep discussions, great company, and wine!",
    location: "The Book Club Bar",
    address: "197 E 3rd St, New York, NY",
    time: "Sunday, 4:00 PM - 6:00 PM",
    date: "Sunday",
    startTime: "4:00 PM",
    endTime: "6:00 PM",
    attendees: 5,
    capacity: 8,
    tags: ["books", "reading", "discussion", "wine"],
    creator: {
      name: "Alex P.",
      avatar: "",
      initials: "AP"
    },
    price: "$10",
    priceValue: 10,
    lat: 40.7202,
    lng: -73.9857,
    image: "/api/placeholder/400/200",
    category: "Culture",
    difficulty: "Easy",
    rsvpDeadline: "Day before"
  },
  {
    id: "5",
    title: "Photography Walk",
    description: "Explore Brooklyn Bridge Park with fellow photography enthusiasts. Bring your camera (phone cameras welcome too!) and let's capture the city together. Tips and tricks sharing included!",
    location: "Brooklyn Bridge Park",
    address: "Brooklyn Bridge Park, Brooklyn, NY",
    time: "Sunday, 2:00 PM - 5:00 PM",
    date: "Sunday",
    startTime: "2:00 PM",
    endTime: "5:00 PM",
    attendees: 3,
    capacity: 10,
    tags: ["photography", "walking", "outdoors", "art"],
    creator: {
      name: "Jordan K.",
      avatar: "",
      initials: "JK"
    },
    price: "Free",
    priceValue: 0,
    lat: 40.7024,
    lng: -73.9969,
    image: "/api/placeholder/400/200",
    category: "Arts",
    difficulty: "Easy",
    rsvpDeadline: "2 hours before"
  }
]

export default function EventsPage() {
  const [view, setView] = useState<'list' | 'map'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['all', 'Social', 'Games', 'Fitness', 'Culture', 'Arts']
  const priceRanges = ['all', 'free', 'under-10', 'under-25', 'under-50']

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && event.priceValue === 0) ||
                        (selectedPrice === 'under-10' && event.priceValue < 10) ||
                        (selectedPrice === 'under-25' && event.priceValue < 25) ||
                        (selectedPrice === 'under-50' && event.priceValue < 50)
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <Header currentPage="events" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Discover Amazing Events</h1>
            <p className="text-xl text-orange-100 mb-8">Find your next adventure in Brooklyn & NYC</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Search events, activities, or interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white/90 backdrop-blur border-0 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
              <Button
                variant={view === 'list' ? "default" : "ghost"}
                size="sm"
                onClick={() => setView('list')}
              >
                List
              </Button>
              <Button
                variant={view === 'map' ? "default" : "ghost"}
                size="sm"
                onClick={() => setView('map')}
              >
                Map
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">{filteredEvents.length} events found</span>
            <Button asChild className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500">
              <Link href="/events/create">
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle>Filter Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <select 
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">Any Price</option>
                    <option value="free">Free</option>
                    <option value="under-10">Under $10</option>
                    <option value="under-25">Under $25</option>
                    <option value="under-50">Under $50</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">When</label>
                  <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Any time</option>
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>This week</option>
                    <option>This weekend</option>
                    <option>Next week</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {view === 'map' ? (
          <MapView events={filteredEvents} className="h-[600px]" />
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur">
                <div className="md:flex">
                  {/* Event Image */}
                  <div className="md:w-80 h-48 md:h-auto bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">
                        {event.category === 'Social' && '☕'}
                        {event.category === 'Games' && '🎲'}
                        {event.category === 'Fitness' && '🏃'}
                        {event.category === 'Culture' && '📚'}
                        {event.category === 'Arts' && '📸'}
                      </div>
                      <p className="text-sm font-medium">{event.category}</p>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
                          <Badge variant="secondary" className="text-xs">{event.difficulty}</Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {event.tags.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{event.tags.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-emerald-600 mb-2">{event.price}</div>
                        <div className="flex gap-2 mb-4">
                          <Button size="sm" variant="outline" className="p-2">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="p-2">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          {event.attendees}/{event.capacity} going
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{event.location}</div>
                          <div className="text-sm text-gray-500">{event.address}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{event.date}</div>
                          <div className="text-sm text-gray-500">{event.startTime} - {event.endTime}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">Hosted by</div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={event.creator.avatar} />
                              <AvatarFallback className="text-xs">{event.creator.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-500">{event.creator.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        RSVP by {event.rsvpDeadline}
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                        <Button className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500">
                          RSVP Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {filteredEvents.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedPrice('all')
                  }}>
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 