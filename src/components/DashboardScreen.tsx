import { useNavigate } from 'react-router-dom'
import { Page } from './Page'
import { Header } from './Header'
import { BalanceCard } from './BalanceCard'
import { WalletTypeSection } from './WalletTypeSection'
import { EmptyWalletsState } from './EmptyWalletsState'
import { AddWalletForm } from './AddWalletForm'
import { TYPE_ORDER } from '../theme'
import type { WalletBalance } from '../lib/supabase'
import type { AuthMode, WalletType } from '../types'

export function DashboardScreen({
  authMode,
  wallets,
  walletFormStatus,
  onLogout,
  onCreateWallet,
}: {
  authMode: AuthMode
  wallets: WalletBalance[]
  walletFormStatus: { loading: boolean; error: string | null }
  onLogout: () => void
  onCreateWallet: (name: string, type: WalletType) => Promise<boolean>
}) {
  const navigate = useNavigate()

  const types = TYPE_ORDER.filter(t => wallets.some(w => w.type === t))
  const total = wallets.reduce((a, w) => a + Number(w.balance), 0)

  return (
    <Page>
      <Header
        mode={authMode}
        onAction={authMode === 'utilisateur' ? onLogout : () => navigate('/login')}
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
        onCreate={onCreateWallet}
      />
    </Page>
  )
}
