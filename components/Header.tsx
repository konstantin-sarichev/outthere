'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  Bell,
  MessageSquare,
  Calendar,
  MapPin,
  User,
  LogOut,
  Settings,
  Home
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage }: HeaderProps) {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  const isActive = (page: string) => {
    return currentPage === page || pathname === `/${page}`
  }

  if (isLoading) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              OutThere
            </Link>
            <div className="animate-pulse">
              <div className="h-10 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors">
            OutThere
          </Link>
          
          {user ? (
            // Authenticated user navigation
            <div className="flex items-center space-x-4">
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-1">
                <Link href="/dashboard">
                  <Button 
                    variant="ghost" 
                    className={`${isActive('dashboard') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:text-gray-900'}`}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </Link>
                
                <Link href="/events">
                  <Button 
                    variant="ghost" 
                    className={`${isActive('events') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:text-gray-900'}`}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Events
                  </Button>
                </Link>
                
                <Link href="/calendar">
                  <Button 
                    variant="ghost" 
                    className={`${isActive('calendar') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:text-gray-900'}`}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    // For now, show a message that this feature is coming soon
                    alert('Messages feature coming soon! 💬')
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                  <Badge className="ml-2 bg-gray-100 text-gray-600 text-xs">Soon</Badge>
                </Button>
              </nav>

              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="sm"
                className="relative"
                onClick={() => {
                  alert('Notifications feature coming soon! 🔔')
                }}
              >
                <Bell className="h-5 w-5" />
                {/* Notification badge - only show when there are notifications */}
                {false && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    3
                  </Badge>
                )}
              </Button>

              {/* User Profile Dropdown */}
              <div className="flex items-center space-x-3">
                <Link href="/profile">
                  <div className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.neighborhood}</p>
                    </div>
                  </div>
                </Link>

                {/* Settings/Logout */}
                <div className="flex items-center space-x-1">
                  <Link href="/profile">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Unauthenticated user navigation
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-4">
                <Link href="/#features">
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                    How it works
                  </Button>
                </Link>
                <Link href="/#safety">
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                    Safety
                  </Button>
                </Link>
              </nav>
              
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button 
                    className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 