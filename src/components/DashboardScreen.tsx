import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from './Page'
import { Header } from './Header'
import { BalanceCard } from './BalanceCard'
import { WalletTypeSection } from './WalletTypeSection'
import { EmptyWalletsState } from './EmptyWalletsState'
import { AddWalletForm } from './AddWalletForm'
import { TransactionHistory } from './TransactionHistory'
import { AddTransactionForm } from './AddTransactionForm'
import type { QuickExpenseTrigger } from './AddTransactionForm'
import { QuickExpenseIcons } from './QuickExpenseIcons'
import { TYPE_ORDER } from '../theme'
import type { WalletBalance } from '../lib/supabase'
import type { AuthMode, TransactionRecord, WalletType } from '../types'

export function DashboardScreen({
  authMode,
  wallets,
  transactions,
  walletFormStatus,
  txFormStatus,
  onLogout,
  onCreateWallet,
  onCreateExpense,
  onCreateIncome,
}: {
  authMode: AuthMode
  wallets: WalletBalance[]
  transactions: TransactionRecord[]
  walletFormStatus: { loading: boolean; error: string | null }
  txFormStatus: { loading: boolean; error: string | null }
  onLogout: () => void
  onCreateWallet: (name: string, type: WalletType) => Promise<boolean>
  onCreateExpense: (walletId: string, amount: number, category: string, description: string | null) => Promise<boolean>
  onCreateIncome: (walletId: string, amount: number, description: string | null) => Promise<boolean>
}) {
  const navigate = useNavigate()
  const [quickTrigger, setQuickTrigger] = useState<QuickExpenseTrigger | null>(null)

  const types = TYPE_ORDER.filter(t => wallets.some(w => w.type === t))
  const total = wallets.reduce((a, w) => a + Number(w.balance), 0)

  return (
    <Page>
      <Header
        mode={authMode}
        onAction={authMode === 'utilisateur' ? onLogout : () => navigate('/login')}
      />
      <BalanceCard total={total} />

      {wallets.length > 0 && (
        <QuickExpenseIcons onSelect={category => setQuickTrigger({ category, nonce: Date.now() })} />
      )}

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

      <AddTransactionForm
        wallets={wallets}
        loading={txFormStatus.loading}
        error={txFormStatus.error}
        quickTrigger={quickTrigger}
        onCreateExpense={onCreateExpense}
        onCreateIncome={onCreateIncome}
      />

      <TransactionHistory transactions={transactions} />
    </Page>
  )
}
