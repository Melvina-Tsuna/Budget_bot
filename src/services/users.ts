import { supabase } from '../lib/supabase'

export async function ensureUserRow(userId: string) {
  const { error } = await supabase
    .from('users')
    .upsert({ id: userId }, { onConflict: 'id', ignoreDuplicates: true })

  if (error) throw error
}
