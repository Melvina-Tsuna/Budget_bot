import { ACCENT, ACCENT_SOFT } from '../theme'

export function TypeIcon({ type }: { type: string }) {
  const icon =
    type === 'VIRTUEL' ? (
      <><rect x="4" y="2.5" width="16" height="19" rx="3.2" /><line x1="8" y1="17.2" x2="16" y2="17.2" /></>
    ) : type === 'ESPECES' ? (
      <><rect x="2.2" y="6" width="19.6" height="12" rx="2.4" /><circle cx="12" cy="12" r="2.6" /></>
    ) : (
      <><path d="M3 10 12 4l9 6" /><rect x="4.5" y="10" width="15" height="9" rx="1" /><line x1="9" y1="13" x2="9" y2="17" /><line x1="15" y1="13" x2="15" y2="17" /></>
    )

  return (
    <span style={{ width: 34, height: 34, borderRadius: 10, background: ACCENT_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.7">{icon}</svg>
    </span>
  )
}
