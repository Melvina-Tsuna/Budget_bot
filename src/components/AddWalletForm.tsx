import { useState } from 'react'
import { ACCENT, BORDER, CARD, DANGER, INK, MUTED } from '../theme'
import type { WalletType } from '../types'

const TYPE_OPTIONS: { value: WalletType; label: string }[] = [
  { value: 'ESPECES', label: 'Espèces' },
  { value: 'VIRTUEL', label: 'Virtuel' },
  { value: 'BANQUE', label: 'Banque' },
]

const MAX_NAME_LENGTH = 40

export function AddWalletForm({
  existingNames,
  loading,
  error,
  onCreate,
}: {
  existingNames: string[]
  loading: boolean
  error: string | null
  onCreate: (name: string, type: WalletType) => Promise<boolean>
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState<WalletType>('ESPECES')
  const [validationError, setValidationError] = useState<string | null>(null)

  const close = () => {
    setOpen(false)
    setName('')
    setType('ESPECES')
    setValidationError(null)
  }

  const submit = async () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setValidationError('Le nom du portefeuille est requis.')
      return
    }
    if (trimmed.length > MAX_NAME_LENGTH) {
      setValidationError(`Le nom ne doit pas dépasser ${MAX_NAME_LENGTH} caractères.`)
      return
    }
    if (existingNames.some(n => n.toLowerCase() === trimmed.toLowerCase())) {
      setValidationError('Un portefeuille porte déjà ce nom.')
      return
    }

    setValidationError(null)
    const created = await onCreate(trimmed, type)
    if (created) close()
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ width: '100%', padding: '12px 0', border: `1px dashed ${BORDER}`, borderRadius: 14, background: 'transparent', color: ACCENT, fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}
      >
        + Ajouter un portefeuille
      </button>
    )
  }

  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ margin: 0, fontSize: 12.5, color: MUTED }}>
        Chaque portefeuille correspond à un endroit où l'argent est gardé : liquide, compte mobile, banque.
      </p>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom du portefeuille"
        maxLength={MAX_NAME_LENGTH}
        style={{ padding: '10px 12px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 16, fontFamily: 'inherit', color: INK }}
      />
      <select
        value={type}
        onChange={e => setType(e.target.value as WalletType)}
        style={{ padding: '10px 12px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 16, fontFamily: 'inherit', color: INK, background: '#fff' }}
      >
        {TYPE_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {(validationError ?? error) && (
        <p style={{ margin: 0, fontSize: 12.5, color: DANGER }}>{validationError ?? error}</p>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: 10, background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}
        >
          {loading ? 'Ajout…' : 'Ajouter'}
        </button>
        <button
          type="button"
          onClick={close}
          disabled={loading}
          style={{ padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', color: MUTED, fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}
        >
          Annuler
        </button>
      </div>
    </div>
  )
}
