# BudgetBot

Application de suivi de budget personnel (PWA) pensée pour l'Afrique de l'Ouest (FCFA). L'application fonctionne entièrement sans IA — saisie manuelle des transactions et calcul des soldes par portefeuille — avec une couche de saisie en langage naturel prévue en complément.

## Stack

- **Frontend** : React + TypeScript + Vite
- **Backend** : Supabase (PostgreSQL, Auth, Row Level Security)
- **PWA** : manifest + service worker

## Prérequis

- Node.js 18+
- Un projet Supabase avec le schéma défini dans `docs/budgetbot_schema.sql`

## Configuration

Copie `.env.example` vers `.env` à la racine et renseigne tes propres valeurs :

```
VITE_SUPABASE_URL=https://<ton-projet>.supabase.co
VITE_SUPABASE_ANON_KEY=<ta-clé-anon>
```

Le fichier `.env` n'est jamais commité (voir `.gitignore`).

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Vérifie les types puis build de production |
| `npm run lint` | Analyse statique du code (ESLint) |
| `npm run preview` | Prévisualise le build de production |

## Architecture

Le code applicatif vit dans `src/`, organisé par responsabilité :

```
src/
  App.tsx           orchestrateur : choisit l'écran à afficher
  hooks/            état et logique métier (useBudgetApp)
  services/         appels Supabase (wallets, auth, users)
  components/       éléments d'UI, un fichier par composant
  lib/              client Supabase et types de données
  utils/            fonctions utilitaires (formatage, messages d'erreur)
  theme.ts          couleurs et constantes partagées
  types.ts          types partagés (mode d'auth, statut de formulaire…)
```

`App.tsx` ne contient aucune logique métier : il assemble les composants et délègue l'état à `useBudgetApp`, qui lui-même délègue les appels réseau aux `services/`.
