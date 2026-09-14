import type { ReactNode } from 'react'
import { BG } from '../theme'

export function Page({ children }: { children: ReactNode }) {
  return (
    <main style={{ maxWidth: 420, margin: '0 auto', minHeight: '100vh', background: BG, padding: '20px 20px 28px', fontFamily: "'Manrope', system-ui, sans-serif", display: 'flex', flexDirection: 'column', gap: 18, boxSizing: 'border-box' }}>
      {children}
    </main>
  )
}
