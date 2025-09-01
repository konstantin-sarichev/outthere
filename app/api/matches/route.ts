import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = searchParams.get('limit') || '5'

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get user profile and interests
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select(`
        *,
        user_interests (tag)
      `)
      .eq('id', userId)
      .single()

    if (userError || !userProfile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Simple matching algorithm - find users with similar interests in same area
    const userInterests = userProfile.user_interests.map((ui: any) => ui.tag)
    
    const { data: potentialMatches, error: matchError } = await supabase
      .from('users')
      .select(`
        *,
        user_interests (tag)
      `)
      .neq('id', userId)
      .eq('neighborhood', userProfile.neighborhood)
      .limit(parseInt(limit) * 3) // Get more to filter

    if (matchError) {
      return NextResponse.json({ error: matchError.message }, { status: 400 })
    }

    // Calculate match scores
    const matches = potentialMatches
      .map((match: any) => {
        const matchInterests = match.user_interests.map((ui: any) => ui.tag)
        const commonInterests = userInterests.filter((interest: string) => 
          matchInterests.includes(interest)
        )
        
        const score = Math.round((commonInterests.length / Math.max(userInterests.length, matchInterests.length)) * 100)
        
        return {
          ...match,
          matchScore: score,
          commonInterests
        }
      })
      .filter((match: any) => match.matchScore > 0)
      .sort((a: any, b: any) => b.matchScore - a.matchScore)
      .slice(0, parseInt(limit))

    return NextResponse.json({ matches })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 