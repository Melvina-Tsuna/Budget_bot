import type { ReactNode } from 'react'
import { BG } from '../theme'

export function Page({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        maxWidth: 420,
        margin: '0 auto',
        minHeight: '100dvh',
        background: BG,
        padding: 'max(20px, env(safe-area-inset-top)) max(20px, env(safe-area-inset-right)) max(28px, env(safe-area-inset-bottom)) max(20px, env(safe-area-inset-left))',
        fontFamily: "'Manrope', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </main>
  )
}
