import { useState } from 'react'
import { Page } from './Page'
import { Header } from './Header'
import { CenteredMessage } from './CenteredMessage'
import { LoginForm } from './LoginForm'
import { ACCENT, BORDER, CARD, INK, MUTED } from '../theme'
import type { LoginStatus } from '../types'

export function LoggedOutScreen({
  loginStatus,
  onLogin,
  onLoginAnonymous,
}: {
  loginStatus: LoginStatus
  onLogin: (email: string, password: string) => Promise<boolean>
  onLoginAnonymous: () => void
}) {
  const [showLoginForm, setShowLoginForm] = useState(false)

  return (
    <Page>
      <Header />
      <CenteredMessage
        iconBg="#eef0f2"
        title="Tu es déconnecté"
        description="Reprends en mode anonyme ou connecte-toi pour retrouver tes soldes."
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.6">
            <rect x="5" y="11" width="14" height="9" rx="2.2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        }
      >
        {showLoginForm ? (
          <LoginForm
            loading={loginStatus.loading}
            error={loginStatus.error}
            onSubmit={onLogin}
            onCancel={() => setShowLoginForm(false)}
          />
        ) : (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            <button
              type="button"
              onClick={() => setShowLoginForm(true)}
              style={{ width: '100%', padding: '12px 0', border: 'none', borderRadius: 12, background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
            >
              Se connecter
            </button>
            <button
              type="button"
              onClick={onLoginAnonymous}
              disabled={loginStatus.loading}
              style={{ width: '100%', padding: '12px 0', border: `1px solid ${BORDER}`, borderRadius: 12, background: CARD, color: INK, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
            >
              Continuer en anonyme
            </button>
          </div>
        )}
      </CenteredMessage>
    </Page>
  )
}
