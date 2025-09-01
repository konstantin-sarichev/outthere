'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import GoogleMapsLoader from './GoogleMapsLoader'

interface MapViewProps {
  events?: Array<{
    id: string
    title: string
    location: string
    lat?: number
    lng?: number
    attendees: number
    capacity: number
    time: string
    tags: string[]
  }>
  center?: { lat: number; lng: number }
  zoom?: number
  className?: string
}

export default function MapView({ 
  events = [], 
  center = { lat: 40.7128, lng: -73.9654 }, 
  zoom = 13,
  className = ""
}: MapViewProps) {
  
  const fallbackMapView = (
    <Card className={`overflow-hidden ${className}`}>
      <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 relative">
        {/* Map placeholder with event markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map</h3>
            <p className="text-gray-600 mb-4">
              {events.length} events in your area
            </p>
            <div className="flex justify-center">
              <Badge className="bg-blue-600 text-white">
                Google Maps integration ready
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Mock event markers */}
        <div className="absolute top-16 left-20 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        <div className="absolute top-32 right-24 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        <div className="absolute bottom-20 left-32 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
          <div className="text-xs font-medium text-gray-800 mb-2">Event Types</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Social</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Fitness</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Culture</span>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg shadow-lg">
          <div className="flex flex-col">
            <button className="p-2 hover:bg-gray-100 rounded-t-lg border-b border-gray-200">
              <span className="text-lg">+</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-b-lg">
              <span className="text-lg">−</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Event list below map */}
      {events.length > 0 && (
        <div className="p-4 border-t bg-white">
          <h4 className="font-semibold text-gray-900 mb-3">Events on Map</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    📍
                  </div>
                  <div>
                    <div className="font-medium text-sm">{event.title}</div>
                    <div className="text-xs text-gray-500">{event.location}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {event.attendees}/{event.capacity}
                </div>
              </div>
            ))}
            {events.length > 3 && (
              <div className="text-center text-xs text-gray-500 pt-2">
                +{events.length - 3} more events
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  )

  return (
    <GoogleMapsLoader fallback={fallbackMapView}>
      {/* Real Google Maps would go here when API is available */}
      {fallbackMapView}
    </GoogleMapsLoader>
  )
} 