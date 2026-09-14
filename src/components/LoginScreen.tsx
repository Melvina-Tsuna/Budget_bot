import { Page } from './Page'
import { Header } from './Header'
import { CenteredMessage } from './CenteredMessage'
import { LoginForm } from './LoginForm'
import { ACCENT } from '../theme'
import type { LoginStatus } from '../types'

export function LoginScreen({
  loginStatus,
  onLogin,
  onCancel,
}: {
  loginStatus: LoginStatus
  onLogin: (email: string, password: string) => Promise<boolean>
  onCancel: () => void
}) {
  return (
    <Page>
      <Header />
      <CenteredMessage
        iconBg="#e6e5f6"
        title="Connecte-toi"
        description="Saisis tes identifiants pour retrouver tes portefeuilles."
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.6">
            <circle cx="12" cy="8" r="3.4" />
            <path d="M5.5 19.5c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          </svg>
        }
      >
        <LoginForm
          loading={loginStatus.loading}
          error={loginStatus.error}
          onSubmit={onLogin}
          onCancel={onCancel}
        />
      </CenteredMessage>
    </Page>
  )
}
