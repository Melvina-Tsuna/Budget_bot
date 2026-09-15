import { Route, Routes, useNavigate } from 'react-router-dom'
import { useBudgetApp } from './hooks/useBudgetApp'
import { DashboardScreen } from './components/DashboardScreen'
import { LoadingScreen } from './components/LoadingScreen'
import { ErrorScreen } from './components/ErrorScreen'
import { LoggedOutScreen } from './components/LoggedOutScreen'
import { LoginScreen } from './components/LoginScreen'
import type { LoginStatus } from './types'

function LoginRoute({
  loginStatus,
  onLogin,
}: {
  loginStatus: LoginStatus
  onLogin: (email: string, password: string) => Promise<boolean>
}) {
  const navigate = useNavigate()

  return (
    <LoginScreen
      loginStatus={loginStatus}
      onLogin={async (email, password) => {
        const ok = await onLogin(email, password)
        if (ok) navigate('/')
        return ok
      }}
      onCancel={() => navigate('/')}
    />
  )
}

export default function App() {
  const {
    wallets,
    error,
    loading,
    authMode,
    signedOut,
    loginStatus,
    walletFormStatus,
    retry,
    handleAnonymousLogin,
    handleUserLogin,
    handleLogout,
    addWallet,
  } = useBudgetApp()

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} onRetry={retry} />
  if (signedOut) {
    return (
      <LoggedOutScreen
        loginStatus={loginStatus}
        onLogin={handleUserLogin}
        onLoginAnonymous={handleAnonymousLogin}
      />
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginRoute loginStatus={loginStatus} onLogin={handleUserLogin} />} />
      <Route
        path="/"
        element={
          <DashboardScreen
            authMode={authMode}
            wallets={wallets}
            walletFormStatus={walletFormStatus}
            onLogout={handleLogout}
            onCreateWallet={addWallet}
          />
        }
      />
    </Routes>
  )
}
