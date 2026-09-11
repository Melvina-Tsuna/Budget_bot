import { useEffect, useState } from 'react'
import { supabase, type WalletBalance } from './lib/supabase'
import { signInWithTestUser } from './lib/testAuth'

const fcfa = (n: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' F'

export default function App() {
  const [wallets, setWallets] = useState<WalletBalance[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [authMode, setAuthMode] = useState<'anonyme' | 'utilisateur'>('anonyme')
  const [loginStatus, setLoginStatus] = useState<{ loading: boolean; message: string | null; error: string | null }>({
    loading: false,
    message: null,
    error: null,
  })

  const loadWallets = async () => {
    const { data, error: walletsError } = await supabase
      .from('wallet_balances')
      .select('*')
      .order('type')
      .order('name')

    if (walletsError) throw walletsError
    setWallets(data ?? [])
  }

  const refreshAuthMode = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw sessionError

    if (!session) {
      const { error } = await supabase.auth.signInAnonymously()
      if (error) throw error
      setAuthMode('anonyme')
      return
    }

    setAuthMode(session.user.is_anonymous ? 'anonyme' : 'utilisateur')
  }

  useEffect(() => {
    ;(async () => {
      try {
        await refreshAuthMode()
        await loadWallets()
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleAnonymousLogin = async () => {
    setLoginStatus({ loading: true, message: null, error: null })

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (session && !session.user.is_anonymous) {
        const { error: signOutError } = await supabase.auth.signOut()
        if (signOutError) throw signOutError
      }

      const { error } = await supabase.auth.signInAnonymously()
      if (error) throw error

      setAuthMode('anonyme')
      await loadWallets()
      setLoginStatus({
        loading: false,
        message: 'Mode anonyme activé.',
        error: null,
      })
    } catch (e) {
      setLoginStatus({
        loading: false,
        message: null,
        error: e instanceof Error ? e.message : String(e),
      })
    }
  }

  const handleTestLogin = async () => {
    setLoginStatus({ loading: true, message: null, error: null })

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (session && session.user.is_anonymous) {
        const { error: signOutError } = await supabase.auth.signOut()
        if (signOutError) throw signOutError
      }

      const { data, error } = await signInWithTestUser()
      if (error) throw error

      setAuthMode('utilisateur')
      await loadWallets()
      setLoginStatus({
        loading: false,
        message: `Connecté en tant que ${data.user?.email ?? 'utilisateur'}`,
        error: null,
      })
    } catch (e) {
      setLoginStatus({
        loading: false,
        message: null,
        error: e instanceof Error ? e.message : String(e),
      })
    }
  }

  if (loading) return <main><p>Chargement…</p></main>
  if (error) return <main><p style={{ color: 'crimson' }}>Erreur : {error}</p></main>

  const byType = (t: string) => wallets.filter(w => w.type === t)
  const sum = (ws: WalletBalance[]) => ws.reduce((a, w) => a + Number(w.balance), 0)
  const total = sum(wallets)

  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <img
          src="/img/logo.png"
          alt="Logo BudgetBot"
          style={{ width: 42, height: 42, objectFit: 'contain', borderRadius: 10 }}
        />
        <h1 style={{ fontSize: 18, margin: 0 }}>Mes soldes</h1>
      </div>

      <p style={{ marginBottom: 16, padding: '8px 10px', background: '#f3f4f6', borderRadius: 8 }}>
        Session actuelle : <strong>{authMode === 'anonyme' ? 'Anonyme' : 'Utilisateur'}</strong>
      </p>

      {['VIRTUEL', 'ESPECES'].map(type => {
        const group = byType(type)
        if (!group.length) return null
        return (
          <section key={type} style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 13, opacity: .6, textTransform: 'uppercase' }}>
              {type === 'VIRTUEL' ? 'Virtuel' : 'Espèces'}
            </h2>
            {group.map(w => (
              <div key={w.wallet_id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span>{w.name}</span>
                <strong>{fcfa(Number(w.balance))}</strong>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid #ddd', opacity: .7 }}>
              <span>Sous-total</span>
              <span>{fcfa(sum(group))}</span>
            </div>
          </section>
        )
      })}

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '2px solid #333', fontSize: 18 }}>
        <strong>Disponible</strong>
        <strong>{fcfa(total)}</strong>
      </div>

      <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
        <button
          type="button"
          onClick={handleAnonymousLogin}
          disabled={loginStatus.loading || authMode === 'anonyme'}
          style={{
            padding: '10px 14px',
            border: 'none',
            borderRadius: 8,
            background: authMode === 'anonyme' ? '#9ca3af' : '#111827',
            color: '#fff',
            fontWeight: 600,
            cursor: loginStatus.loading || authMode === 'anonyme' ? 'default' : 'pointer',
          }}
        >
          {authMode === 'anonyme' ? 'Mode anonyme actif' : 'Passer en utilisateur anonyme'}
        </button>

        <button
          type="button"
          onClick={handleTestLogin}
          disabled={loginStatus.loading || authMode === 'utilisateur'}
          style={{
            padding: '10px 14px',
            border: 'none',
            borderRadius: 8,
            background: authMode === 'utilisateur' ? '#9ca3af' : '#2563eb',
            color: '#fff',
            fontWeight: 600,
            cursor: loginStatus.loading || authMode === 'utilisateur' ? 'default' : 'pointer',
          }}
        >
          {authMode === 'utilisateur' ? 'Utilisateur connecté' : 'Passer en utilisateur'}
        </button>

        {loginStatus.message && (
          <p style={{ margin: 0, color: 'green' }}>{loginStatus.message}</p>
        )}

        {loginStatus.error && (
          <p style={{ margin: 0, color: 'crimson' }}>{loginStatus.error}</p>
        )}
      </div>

      {wallets.length === 0 && (
        <p style={{ opacity: .6, marginTop: 24 }}>
          Aucun portefeuille. Normal : cette session anonyme est un nouvel utilisateur.
        </p>
      )}
    </main>
  )
}