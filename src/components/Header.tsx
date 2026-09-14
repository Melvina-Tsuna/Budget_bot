import { AppIcon } from './AppIcon'
import { ACCENT, MUTED, SUCCESS } from '../theme'
import type { AuthMode } from '../types'

function SessionAction({ mode, onClick }: { mode: AuthMode; onClick: () => void }) {
  const isUser = mode === 'utilisateur'
  const dotColor = isUser ? SUCCESS : MUTED

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 999, background: '#eef0f2', border: 'none', cursor: 'pointer' }}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor }} />
      <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT }}>{isUser ? 'Se déconnecter' : 'Se connecter'}</span>
    </button>
  )
}

export function Header({ mode, onAction }: { mode?: AuthMode; onAction?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <AppIcon />
        <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.01em' }}>BudgetBot</span>
      </div>
      {mode && onAction && <SessionAction mode={mode} onClick={onAction} />}
    </div>
  )
}
