import { ACCENT } from '../theme'

export function AppIcon() {
  return (
    <span style={{ width: 38, height: 38, borderRadius: 10, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="22" height="22" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9.5" fill="#ffffff" />
        <path d="M8.2 14.6 11 10.8l2.1 2.4 2.7-3.9" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M13.6 8.7h2.4v2.4" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </span>
  )
}
