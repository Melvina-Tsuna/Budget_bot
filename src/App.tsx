import { useState } from 'react'
import { useBudgetApp } from './hooks/useBudgetApp'
import { Page } from './components/Page'
import { Header } from './components/Header'
import { BalanceCard } from './components/BalanceCard'
import { WalletTypeSection } from './components/WalletTypeSection'
import { EmptyWalletsState } from './components/EmptyWalletsState'
import { AddWalletForm } from './components/AddWalletForm'
import { LoadingScreen } from './components/LoadingScreen'
import { ErrorScreen } from './components/ErrorScreen'
import { LoggedOutScreen } from './components/LoggedOutScreen'
import { LoginScreen } from './components/LoginScreen'
import { TYPE_ORDER } from './theme'

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

  const [showLoginScreen, setShowLoginScreen] = useState(false)

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

  if (showLoginScreen) {
    return (
      <LoginScreen
        loginStatus={loginStatus}
        onLogin={async (email, password) => {
          const ok = await handleUserLogin(email, password)
          if (ok) setShowLoginScreen(false)
          return ok
        }}
        onCancel={() => setShowLoginScreen(false)}
      />
    )
  }

  const types = TYPE_ORDER.filter(t => wallets.some(w => w.type === t))
  const total = wallets.reduce((a, w) => a + Number(w.balance), 0)

  return (
    <Page>
      <Header
        mode={authMode}
        onAction={authMode === 'utilisateur' ? handleLogout : () => setShowLoginScreen(true)}
      />
      <BalanceCard total={total} />

      {types.map(type => (
        <WalletTypeSection key={type} type={type} wallets={wallets.filter(w => w.type === type)} />
      ))}

      {wallets.length === 0 && <EmptyWalletsState authMode={authMode} />}

      <AddWalletForm
        existingNames={wallets.map(w => w.name)}
        loading={walletFormStatus.loading}
        error={walletFormStatus.error}
        onCreate={addWallet}
      />
    </Page>
  )
}
