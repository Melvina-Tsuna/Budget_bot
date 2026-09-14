import type { ReactNode } from 'react'
import { INK, MUTED } from '../theme'

export function CenteredMessage({
  icon,
  iconBg,
  title,
  description,
  children,
}: {
  icon: ReactNode
  iconBg: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center', padding: '0 12px' }}>
      <span style={{ width: 76, height: 76, borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </span>
      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>{title}</div>
        <div style={{ fontSize: 13.5, color: MUTED, marginTop: 6, lineHeight: 1.5 }}>{description}</div>
      </div>
      {children}
    </div>
  )
}
