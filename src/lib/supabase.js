import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Keep user logged in for 1 week of inactivity
    persistSession: true,
    autoRefreshToken: true,
  },
})

console.log("URL:", supabaseUrl)
console.log("KEY:", supabaseAnonKey)