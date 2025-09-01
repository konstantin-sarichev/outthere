import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, ageRange, pronouns, bio, neighborhood, radiusKm } = await request.json()

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Create profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          name,
          age_range: ageRange,
          pronouns,
          bio,
          neighborhood,
          radius_km: radiusKm,
          photos: [],
          socials: {},
          preferences: {},
        })

      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 400 })
      }
    }

    return NextResponse.json({ 
      user: authData.user,
      session: authData.session 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 