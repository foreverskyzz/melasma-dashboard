import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hyperbeam_melasma-tracker.supabase.co'
const supabaseAnonKey = 'YOUR_ANON_PUBLIC_KEY'  // Get from Supabase API page (NOT service_role)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)