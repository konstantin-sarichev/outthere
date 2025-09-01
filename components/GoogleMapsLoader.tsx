'use client'

import { useEffect, useState } from 'react'

interface GoogleMapsLoaderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function GoogleMapsLoader({ children, fallback }: GoogleMapsLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (typeof window !== 'undefined' && window.google?.maps) {
      setIsLoaded(true)
      return
    }

    // For now, we'll simulate loading without actually loading the API
    // In a real app, you would load the Google Maps API here
    const timer = setTimeout(() => {
      setIsLoaded(false) // Keep this false for now since we don't have API key
      setHasError(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (hasError || !isLoaded) {
    return (
      fallback || (
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-gray-600 font-medium">Map View</p>
            <p className="text-sm text-gray-500 mt-2">
              Google Maps integration coming soon
            </p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}

// Global type declaration for Google Maps
declare global {
  interface Window {
    google?: {
      maps: any
    }
  }
} 