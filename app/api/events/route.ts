import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '10'

    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        venues (
          name,
          lat,
          lng,
          categories
        ),
        event_attendees (
          user_id,
          rsvp_status
        )
      `)
      .eq('status', 'active')
      .gte('start_ts', new Date().toISOString())
      .order('start_ts', { ascending: true })
      .limit(parseInt(limit))

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ events: data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      title, 
      description, 
      venueId, 
      startTs, 
      endTs, 
      capacity, 
      tags, 
      creatorId 
    } = await request.json()

    const { data, error } = await supabase
      .from('events')
      .insert({
        creator_id: creatorId,
        title,
        description,
        venue_id: venueId,
        start_ts: startTs,
        end_ts: endTs,
        capacity,
        visibility: 'public',
        tags,
        status: 'active'
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ event: data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 