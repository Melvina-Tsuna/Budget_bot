import { useState } from 'react'
import { ACCENT, BORDER, DANGER, INK, MUTED } from '../theme'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm({
  loading,
  error,
  onSubmit,
  onCancel,
}: {
  loading: boolean
  error: string | null
  onSubmit: (email: string, password: string) => Promise<boolean>
  onCancel: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const submit = async () => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
      setValidationError('Adresse e-mail invalide.')
      return
    }
    if (!password) {
      setValidationError('Le mot de passe est requis.')
      return
    }

    setValidationError(null)
    await onSubmit(trimmedEmail, password)
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Adresse e-mail"
        autoComplete="email"
        style={{ padding: '10px 12px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 16, fontFamily: 'inherit', color: INK }}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Mot de passe"
        autoComplete="current-password"
        style={{ padding: '10px 12px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 16, fontFamily: 'inherit', color: INK }}
      />

      {(validationError ?? error) && (
        <p style={{ margin: 0, fontSize: 12.5, color: DANGER }}>{validationError ?? error}</p>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          style={{ flex: 1, padding: '12px 0', border: 'none', borderRadius: 12, background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{ padding: '12px 16px', border: `1px solid ${BORDER}`, borderRadius: 12, background: 'transparent', color: MUTED, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
        >
          Annuler
        </button>
      </div>
    </div>
  )
}
