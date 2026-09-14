import { ACCENT, ACCENT_SOFT, MUTED } from '../theme'
import type { AuthMode } from '../types'

export function EmptyWalletsState({ authMode }: { authMode: AuthMode }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', padding: '0 12px' }}>
      <span style={{ width: 76, height: 76, borderRadius: '50%', background: ACCENT_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.6">
          <path d="M3 7.5C3 6.12 4.12 5 5.5 5H16a2 2 0 0 1 2 2v1" />
          <path d="M3 7.5v9C3 17.88 4.12 19 5.5 19H19a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5.5C4.12 8 3 7.88 3 7.5Z" />
          <circle cx="16.5" cy="13.5" r="1.4" />
        </svg>
      </span>
      <div>
        <div style={{ fontSize: 16, fontWeight: 800 }}>Aucun portefeuille pour l'instant</div>
        <div style={{ fontSize: 13.5, color: MUTED, marginTop: 6, lineHeight: 1.5 }}>
          {authMode === 'anonyme'
            ? "Cette session anonyme est nouvelle: ajoute un portefeuille pour voir tes soldes ici."
            : 'Aucun portefeuille pour ce compte.'}
        </div>
      </div>
    </div>
  )
}
