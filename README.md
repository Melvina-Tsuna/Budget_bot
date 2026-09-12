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

Crée un fichier `.env` à la racine avec :

```
VITE_SUPABASE_URL=https://<ton-projet>.supabase.co
VITE_SUPABASE_ANON_KEY=<ta-clé-anon>
```

Ce fichier n'est jamais commité (voir `.gitignore`).

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Vérifie les types puis build de production |
| `npm run lint` | Analyse statique du code (ESLint) |
| `npm run preview` | Prévisualise le build de production |

## Documentation du projet

Le dossier `docs/` (non versionné) contient la feuille de route, le schéma SQL, le prompt système de l'IA et le plan de tâches en cours.
