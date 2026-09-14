import { supabase } from '../lib/supabase'
import type { AuthMode } from '../types'

export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

export async function signOutIfSessionMismatches(shouldBeAnonymous: boolean) {
  const session = await getCurrentSession()
  if (session && session.user.is_anonymous !== shouldBeAnonymous) {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}

export async function ensureSession(): Promise<AuthMode> {
  const session = await getCurrentSession()

  if (!session) {
    const { error } = await supabase.auth.signInAnonymously()
    if (error) throw error
    return 'anonyme'
  }

  return session.user.is_anonymous ? 'anonyme' : 'utilisateur'
}

export async function loginAnonymously() {
  await signOutIfSessionMismatches(true)
  const { error } = await supabase.auth.signInAnonymously()
  if (error) throw error
}

export async function loginWithCredentials(email: string, password: string) {
  await signOutIfSessionMismatches(false)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.user?.email ?? 'utilisateur'
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
