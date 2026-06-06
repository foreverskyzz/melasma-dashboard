import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hyperbeam_melasma-tracker.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzc2xkZndveWR2ZWhpeXdmc21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NTM5ODYsImV4cCI6MjA5NjMyOTk4Nn0.ghOGTuSSI7erVKribZJskFbKcbkhvbbwonTTf2qkLs0'  // Get from Supabase API page (NOT service_role)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
