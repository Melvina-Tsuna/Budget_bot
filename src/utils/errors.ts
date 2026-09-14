export const toFriendlyMessage = (e: unknown): string => {
  const raw =
    e instanceof Error ? e.message
    : typeof e === 'object' && e !== null && 'message' in e ? String((e as { message: unknown }).message)
    : String(e)

  if (/failed to fetch/i.test(raw) || /network/i.test(raw)) {
    return 'Impossible de contacter le serveur. Vérifie ta connexion internet et réessaie.'
  }
  if (/invalid login credentials/i.test(raw)) {
    return 'Identifiants incorrects.'
  }
  if (/duplicate key value violates unique constraint/i.test(raw)) {
    return 'Un portefeuille porte déjà ce nom.'
  }
  return "Une erreur inattendue s'est produite. Réessaie dans un instant."
}
