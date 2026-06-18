import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to fetch projects
export async function getProjects(category?: string) {
  let query = supabase.from('projects').select('*')

  if (category && category !== 'ALL') {
    query = query.eq('category', category)
  }

  return query.order('created_at', { ascending: false })
}

// Helper function to fetch single project
export async function getProject(id: string) {
  return supabase.from('projects').select('*').eq('id', id).single()
}

// Helper function to save booking
export async function saveBooking(bookingData: {
  name: string
  email: string
  phone: string
  service: string
  budget?: string
  date?: string
  notes?: string
}) {
  return supabase.from('bookings').insert([bookingData]).select()
}
