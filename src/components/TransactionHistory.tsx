import { BORDER, CARD, DANGER, MUTED, SUCCESS } from '../theme'
import { fcfa, shortDate } from '../utils/format'
import type { TransactionRecord } from '../types'

export function TransactionHistory({ transactions }: { transactions: TransactionRecord[] }) {
  if (transactions.length === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', paddingLeft: 2 }}>
        Historique récent
      </div>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
        {transactions.map((tx, i) => {
          const isIncome = tx.type === 'INCOME'
          return (
            <div
              key={tx.id}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < transactions.length - 1 ? `1px solid ${BORDER}` : 'none' }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tx.description || tx.category || (isIncome ? 'Revenu' : 'Dépense')}
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>
                  {shortDate(tx.occurredOn)} · {tx.walletName}
                </div>
              </div>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: isIncome ? SUCCESS : DANGER, whiteSpace: 'nowrap' }}>
                {isIncome ? '+' : '-'}{fcfa(tx.amount)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
