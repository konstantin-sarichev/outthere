'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  MapPin,
  Users,
  Shield,
  Sparkles,
  Calendar,
  MessageSquare,
  Heart,
  Star,
  CheckCircle
} from "lucide-react"
import { UserProfile } from "@/lib/ai-recommendations"

const features = [
  {
    icon: Sparkles,
    title: "Smart Matching",
    description: "Our AI finds events and people that match your interests, availability, and vibe.",
    stats: "95% match accuracy"
  },
  {
    icon: MapPin,
    title: "Local Discovery",
    description: "Discover hidden gems and events in your neighborhood that you'd never find otherwise.",
    stats: "500+ venues mapped"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Verified profiles, safe meetup locations, and community guidelines keep everyone protected.",
    stats: "Zero tolerance policy"
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer, Williamsburg",
    content: "I moved to NYC not knowing anyone. OutThere helped me find my running group, book club, and now I have weekend plans every week!",
    avatar: "SC",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    role: "Designer, Park Slope",
    content: "The AI suggestions are scary good. It recommended a board game night that became my regular Thursday thing.",
    avatar: "MJ",
    rating: 5
  },
  {
    name: "Emma Rodriguez",
    role: "Teacher, Astoria",
    content: "Finally, an app that gets that I want to meet people who actually share my interests, not just anyone nearby.",
    avatar: "ER",
    rating: 5
  }
]

const stats = [
  { number: "10K+", label: "Active Members" },
  { number: "500+", label: "Weekly Events" },
  { number: "95%", label: "Match Success Rate" },
  { number: "50+", label: "NYC Neighborhoods" }
]

export default function HomePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('outthereUser')
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData) as UserProfile
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('outthereUser')
      }
    }
    setIsLoading(false)
  }, [])

  // If user is logged in, redirect to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  // Only show landing page for non-authenticated users
  if (user) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <nav className="flex justify-between items-center py-6">
            <div className="text-2xl font-bold">
              OutThere
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                How it works
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Safety
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
                <Link href="/signup">Sign In</Link>
              </Button>
              <Button className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                  🎉 Now in Brooklyn, Manhattan & Queens
                </Badge>

                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  Turn your{" "}
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    free time
                  </span>
                  into real connections
                </h1>

                <p className="text-xl lg:text-2xl text-orange-100 mb-8 leading-relaxed">
                  Meet like-minded people in your neighborhood through curated events and smart matching.
                  Your social life starts here.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 h-14 px-8 text-lg font-semibold" asChild>
                    <Link href="/signup" className="flex items-center gap-2">
                      Start Meeting People
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
                    Watch Demo
                  </Button>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-6 text-orange-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Free to join</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Verified profiles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Safe meetups</span>
                  </div>
                </div>
              </div>

              {/* Hero Image/Illustration */}
              <div className="relative">
                <div className="relative bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Mock event cards */}
                    <Card className="bg-white/90 backdrop-blur border-0 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">☕</div>
                          <div>
                            <div className="font-semibold text-sm">Coffee Chat</div>
                            <div className="text-xs text-gray-500">Today 3PM</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">4/6 going</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/90 backdrop-blur border-0 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">🏃</div>
                          <div>
                            <div className="font-semibold text-sm">Morning Run</div>
                            <div className="text-xs text-gray-500">Sat 8AM</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">8/12 going</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/90 backdrop-blur border-0 shadow-lg col-span-2">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-rose-500 rounded-full"></div>
                            <span className="text-sm font-medium">Sarah</span>
                            <Badge className="text-xs bg-emerald-100 text-emerald-800">95% match</Badge>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">&quot;Love hiking and board games&quot;</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                  ✨
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-xl float">
                  💝
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Growing Community</h2>
            <p className="text-lg text-gray-600">Real people making real connections every day</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How OutThere Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We use smart matching to connect you with the right people and events, making it easy to build genuine friendships
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">{feature.stats}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from people who found their tribe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-red-400 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to get out there?
          </h2>
          <p className="text-xl lg:text-2xl text-orange-100 mb-8">
            Join thousands of people who&apos;ve found their tribe in NYC
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 h-14 px-8 text-lg font-semibold" asChild>
              <Link href="/signup" className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
              Learn More
            </Button>
          </div>

          <p className="text-orange-200 mt-6 text-sm">
            Free to join • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">OutThere</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Connecting people through shared interests and real-world experiences.
                Your social life starts here.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Instagram
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Facebook
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <div><Link href="#" className="text-gray-400 hover:text-white">Features</Link></div>
                <div><Link href="#" className="text-gray-400 hover:text-white">Safety</Link></div>
                <div><Link href="#" className="text-gray-400 hover:text-white">Community</Link></div>
                <div><Link href="#" className="text-gray-400 hover:text-white">Pricing</Link></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <div><Link href="#" className="text-gray-400 hover:text-white">Help Center</Link></div>
                <div><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></div>
                <div><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></div>
                <div><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OutThere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 