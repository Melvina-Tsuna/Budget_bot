import { ACCENT } from '../theme'
import { fcfa } from '../utils/format'

export function BalanceCard({ total }: { total: number }) {
  return (
    <div style={{ background: ACCENT, borderRadius: 22, padding: '24px 22px' }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#c7c5ec' }}>Disponible</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', marginTop: 6, letterSpacing: '-0.02em' }}>{fcfa(total)}</div>
      <div style={{ fontSize: 12, color: '#a9a6dd', marginTop: 8 }}>Tous portefeuilles confondus</div>
    </div>
  )
}
