import { TypeIcon } from './TypeIcon'
import { BORDER, CARD, MUTED, TYPE_LABELS } from '../theme'
import { fcfa } from '../utils/format'
import type { WalletBalance } from '../lib/supabase'

export function WalletTypeSection({ type, wallets }: { type: string; wallets: WalletBalance[] }) {
  const subtotal = wallets.reduce((a, w) => a + Number(w.balance), 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', paddingLeft: 2 }}>
        {TYPE_LABELS[type] ?? type}
      </div>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
        {wallets.map((w, i) => (
          <div key={w.wallet_id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < wallets.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
            <TypeIcon type={type} />
            <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600 }}>{w.name}</span>
            <span style={{ fontSize: 14.5, fontWeight: 700 }}>{fcfa(Number(w.balance))}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px 14px', borderTop: `1px solid ${BORDER}` }}>
          <span style={{ fontSize: 12.5, color: MUTED, fontWeight: 600 }}>Sous-total</span>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: MUTED }}>{fcfa(subtotal)}</span>
        </div>
      </div>
    </div>
  )
}
