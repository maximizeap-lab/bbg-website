import { createServerSupabase } from '@/lib/supabase/server'
import type { Player, Event } from '@/types'

export async function getPlayers(filters?: {
  status?: string
  position?: string
  graduationYear?: number
  search?: string
}): Promise<Player[]> {
  const supabase = createServerSupabase()
  let query = supabase.from('players').select('*').order('name')

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }
  if (filters?.position) {
    query = query.eq('position', filters.position)
  }
  if (filters?.graduationYear) {
    query = query.eq('graduation_year', filters.graduationYear)
  }
  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query
  if (error) {
    console.error('Failed to fetch players:', error)
    return []
  }
  return data as Player[]
}

export async function getPlayer(slug: string): Promise<Player | null> {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as Player
}

export async function getEvents(status?: 'upcoming' | 'past'): Promise<Event[]> {
  const supabase = createServerSupabase()
  let query = supabase.from('events').select('*').order('event_date', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query
  if (error) {
    console.error('Failed to fetch events:', error)
    return []
  }
  return data as Event[]
}

export async function getEvent(slug: string): Promise<Event | null> {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as Event
}

export async function getFeaturedPlayers(): Promise<Player[]> {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('is_featured', true)
    .order('name')
    .limit(12)

  if (error) return []
  return data as Player[]
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'upcoming')
    .order('event_date')
    .limit(6)

  if (error) return []
  return data as Event[]
}

export async function getDashboardStats() {
  const supabase = createServerSupabase()

  const [players, events, registrations, donations] = await Promise.all([
    supabase.from('players').select('id', { count: 'exact', head: true }),
    supabase.from('events').select('id', { count: 'exact', head: true }).eq('status', 'upcoming'),
    supabase.from('registrations').select('id', { count: 'exact', head: true }),
    supabase.from('donations').select('amount_cents').eq('status', 'succeeded'),
  ])

  const totalDonations = (donations.data || []).reduce((sum, d) => sum + (d.amount_cents || 0), 0)

  return {
    totalPlayers: players.count || 0,
    upcomingEvents: events.count || 0,
    totalRegistrations: registrations.count || 0,
    totalDonationsCents: totalDonations,
  }
}

export async function getRecentRegistrations(limit = 5) {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('registrations')
    .select('*, events(name)')
    .order('registered_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return data
}

export async function getRecentDonations(limit = 5) {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('status', 'succeeded')
    .order('donated_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return data
}
