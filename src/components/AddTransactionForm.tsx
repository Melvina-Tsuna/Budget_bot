import { useEffect, useState } from 'react'
import { ACCENT, BORDER, CARD, DANGER, EXPENSE_CATEGORIES, INK, MUTED } from '../theme'
import type { WalletBalance } from '../lib/supabase'
import type { TransactionType } from '../types'

export type QuickExpenseTrigger = { category: string; nonce: number }

export function AddTransactionForm({
  wallets,
  loading,
  error,
  quickTrigger,
  onCreateExpense,
  onCreateIncome,
}: {
  wallets: WalletBalance[]
  loading: boolean
  error: string | null
  quickTrigger?: QuickExpenseTrigger | null
  onCreateExpense: (walletId: string, amount: number, category: string, description: string | null) => Promise<boolean>
  onCreateIncome: (walletId: string, amount: number, description: string | null) => Promise<boolean>
}) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<TransactionType>('EXPENSE')
  const [amount, setAmount] = useState('')
  const [walletId, setWalletId] = useState(wallets[0]?.wallet_id ?? '')
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    if (!quickTrigger) return
    setType('EXPENSE')
    setCategory(quickTrigger.category)
    setOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickTrigger?.nonce])

  const close = () => {
    setOpen(false)
    setType('EXPENSE')
    setAmount('')
    setDescription('')
    setValidationError(null)
  }

  const submit = async () => {
    const parsedAmount = Number(amount)
    if (!amount.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setValidationError('Indique un montant valide, supérieur à 0.')
      return
    }
    const selectedWalletId = walletId || wallets[0]?.wallet_id
    if (!selectedWalletId) {
      setValidationError('Ajoute d\'abord un portefeuille.')
      return
    }

    setValidationError(null)
    const trimmedDescription = description.trim() || null

    const created =
      type === 'EXPENSE'
        ? await onCreateExpense(selectedWalletId, parsedAmount, category, trimmedDescription)
        : await onCreateIncome(selectedWalletId, parsedAmount, trimmedDescription)

    if (created) close()
  }

  if (wallets.length === 0) return null

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ width: '100%', padding: '12px 0', border: `1px dashed ${BORDER}`, borderRadius: 14, background: 'transparent', color: ACCENT, fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}
      >
        + Ajouter une transaction
      </button>
    )
  }

  const inputStyle = { padding: '10px 12px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 16, fontFamily: 'inherit', color: INK, background: '#fff' }

  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', padding: 4, borderRadius: 12, background: '#f3f4f6' }}>
        <button
          type="button"
          onClick={() => setType('EXPENSE')}
          style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 700, background: type === 'EXPENSE' ? ACCENT : 'transparent', color: type === 'EXPENSE' ? '#fff' : MUTED, cursor: 'pointer' }}
        >
          Dépense
        </button>
        <button
          type="button"
          onClick={() => setType('INCOME')}
          style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 700, background: type === 'INCOME' ? ACCENT : 'transparent', color: type === 'INCOME' ? '#fff' : MUTED, cursor: 'pointer' }}
        >
          Revenu
        </button>
      </div>

      <input
        type="number"
        inputMode="decimal"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Montant (F)"
        style={inputStyle}
      />

      <select value={walletId || wallets[0]?.wallet_id} onChange={e => setWalletId(e.target.value)} style={inputStyle}>
        {wallets.map(w => (
          <option key={w.wallet_id} value={w.wallet_id}>{w.name}</option>
        ))}
      </select>

      {type === 'EXPENSE' && (
        <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
          {EXPENSE_CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      )}

      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description (optionnel)"
        maxLength={80}
        style={inputStyle}
      />

      {(validationError ?? error) && (
        <p style={{ margin: 0, fontSize: 12.5, color: DANGER }}>{validationError ?? error}</p>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: 10, background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}
        >
          {loading ? 'Ajout…' : 'Ajouter'}
        </button>
        <button
          type="button"
          onClick={close}
          disabled={loading}
          style={{ padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', color: MUTED, fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}
        >
          Annuler
        </button>
      </div>
    </div>
  )
}
