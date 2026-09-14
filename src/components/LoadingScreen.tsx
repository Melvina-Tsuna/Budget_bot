import { Page } from './Page'
import { Header } from './Header'
import { ACCENT, BORDER, MUTED } from '../theme'

export function LoadingScreen() {
  return (
    <Page>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div
          style={{
            width: 36,
            height: 36,
            border: `3px solid ${BORDER}`,
            borderTopColor: ACCENT,
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{'@keyframes spin { to { transform: rotate(360deg) } }'}</style>
        <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: MUTED }}>Chargement de tes soldes…</p>
      </div>
    </Page>
  )
}
