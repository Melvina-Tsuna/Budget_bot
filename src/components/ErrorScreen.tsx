import { Page } from './Page'
import { Header } from './Header'
import { CenteredMessage } from './CenteredMessage'
import { DANGER, DANGER_SOFT, INK } from '../theme'

export function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <Page>
      <Header />
      <CenteredMessage
        iconBg={DANGER_SOFT}
        title="Une erreur est survenue"
        description={message}
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={DANGER} strokeWidth="1.7">
            <path d="M12 3.5 21.5 20h-19L12 3.5Z" strokeLinejoin="round" />
            <line x1="12" y1="10" x2="12" y2="14.2" />
            <circle cx="12" cy="17" r="0.9" fill={DANGER} stroke="none" />
          </svg>
        }
      >
        <button
          type="button"
          onClick={onRetry}
          style={{ padding: '12px 26px', border: 'none', borderRadius: 12, background: INK, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
        >
          Réessayer
        </button>
      </CenteredMessage>
    </Page>
  )
}
