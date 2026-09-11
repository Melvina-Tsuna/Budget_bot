import { supabase } from './supabase'

export const TEST_EMAIL = 'test@gmail.com'
export const TEST_PASSWORD = 'admin'

export async function signInWithTestUser() {
  return supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  })
}
