import type { ReactElement } from 'react'
import { ACCENT, ACCENT_SOFT, MUTED } from '../theme'

const QUICK_CATEGORIES: { category: string; label: string; icon: ReactElement }[] = [
  {
    category: 'Transport',
    label: 'Transport',
    icon: (
      <>
        <path d="M4 16v-3.5L5.6 8a2 2 0 0 1 1.9-1.4h9a2 2 0 0 1 1.9 1.4L20 12.5V16" />
        <rect x="3" y="16" width="18" height="3.2" rx="1.2" />
        <circle cx="7.5" cy="19.2" r="1" />
        <circle cx="16.5" cy="19.2" r="1" />
      </>
    ),
  },
  {
    category: 'Alimentation',
    label: 'Repas',
    icon: (
      <>
        <path d="M8 3v6a2 2 0 1 0 4 0V3" />
        <path d="M10 9v12" />
        <path d="M16 3c-1.6 1.2-1.6 4.4 0 6.4V21" />
      </>
    ),
  },
  {
    category: 'Loisirs',
    label: 'Loisirs',
    icon: (
      <>
        <path d="M9 18V5l10-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="16" cy="16" r="3" />
      </>
    ),
  },
  {
    category: 'Santé',
    label: 'Santé',
    icon: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
  },
  {
    category: 'Logement & Factures',
    label: 'Factures',
    icon: (
      <>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10v9h12v-9" />
      </>
    ),
  },
]

export function QuickExpenseIcons({ onSelect }: { onSelect: (category: string) => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
      {QUICK_CATEGORIES.map(({ category, label, icon }) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', minHeight: 44 }}
        >
          <span style={{ width: 42, height: 42, borderRadius: '50%', background: ACCENT_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              {icon}
            </svg>
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: MUTED }}>{label}</span>
        </button>
      ))}
    </div>
  )
}
