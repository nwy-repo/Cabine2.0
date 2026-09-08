# Cabine 2.0 — Cabine en ligne

App web pour vendre en ligne des pass internet, pass mix et transferts
d'unité pour Orange CI, Moov Africa et MTN CI, avec paiement par Wave ou
Orange Money.

Le projet a deux parties :
- **`/`** (racine) : le frontend, React + Vite + Tailwind CSS.
- **`/server`** : le backend, Node + Express, qui parle aux API de paiement
  et envoie les emails du formulaire de contact.

## ⚠️ À savoir avant de mettre en ligne

Le code de paiement (`server/services/wave.js` et
`server/services/orangeMoney.js`) est écrit selon la structure documentée
publiquement de l'API Wave Checkout et de l'API Orange Money Web Payment,
mais **il n'a pas pu être testé contre les vraies API** : ni compte
marchand, ni accès réseau à `api.wave.com` / `api.orange.com` n'étaient
disponibles pour le générer. Avant la mise en production :

1. Ouvre un compte **Wave Business** et récupère ta clé API Checkout sur
   [docs.wave.com](https://docs.wave.com/business/checkout-api).
2. Signe un contrat marchand **Orange Money** et crée une application sur
   le [portail développeur Orange](https://developer.orange.com) pour
   obtenir `client_id`, `client_secret` et ta clé marchand.
3. Compare les noms de champs exacts des requêtes/réponses dans la doc à
   jour avec le code de `server/services/`, et ajuste si l'API a changé.
4. Fais un vrai paiement de test (petit montant) avant d'ouvrir au public.

## Installation en local

### 1. Frontend

```bash
npm install
cp .env.example .env
# édite .env : VITE_API_URL et VITE_WHATSAPP_NUMBER
npm run dev
```

L'app tourne sur http://localhost:5173

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
# édite .env avec tes vraies clés (voir ci-dessous)
npm run dev
```

Le serveur tourne sur http://localhost:4000

### Variables d'environnement du backend (`server/.env`)

| Variable | À quoi ça sert | Où l'obtenir |
|---|---|---|
| `WAVE_API_KEY` | Authentifie les appels à Wave Checkout | Dashboard Wave Business |
| `ORANGE_MONEY_CLIENT_ID` / `_SECRET` | OAuth Orange Money | Portail développeur Orange |
| `ORANGE_MONEY_MERCHANT_KEY` | Identifie ton compte marchand | Contrat Orange Money |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Envoi des emails du formulaire de contact | Ton fournisseur email (Gmail avec mot de passe d'application, Brevo, SendGrid…) |
| `CONTACT_TO_EMAIL` | Adresse qui reçoit les messages | — |
| `APP_BASE_URL` | Sert à construire les liens de retour après paiement | URL publique du frontend |
| `CORS_ORIGIN` | Autorise le frontend à appeler le backend | URL publique du frontend |

Sans ces clés, l'app reste utilisable : la navigation, le catalogue et les
formulaires fonctionnent, mais le paiement et l'envoi d'email renvoient un
message d'erreur clair au lieu de planter (le bouton WhatsApp du formulaire
de contact fonctionne lui sans aucune configuration).

## Espace admin (`/admin`) et Supabase

La page `/admin` permet d'ajouter, modifier et supprimer les packs (Internet, Mix, Transfert) pour Orange, Moov et MTN, sans toucher au code. Elle est protégée par un login (Supabase Auth) et lit/écrit dans une table Supabase que le site public consulte pour afficher le catalogue.

### 1. Créer le projet Supabase

1. Sur [supabase.com](https://supabase.com), crée un projet (ou utilise ton compte existant).
2. Dans **Project Settings → API**, récupère l'**URL du projet** et la clé **anon public**.
3. Colle-les dans `.env` (racine du projet) :
   ```
   VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 2. Créer la table et les données de départ

Dans **SQL Editor** sur le tableau de bord Supabase, exécute dans l'ordre :
1. `supabase/schema.sql` — crée la table `packs`, les règles de sécurité (RLS) et les triggers.
2. `supabase/seed.sql` — remplit la table avec les offres d'exemple actuelles (à modifier ensuite depuis `/admin`).

### 3. Créer ton compte admin

Dans **Authentication → Users** sur le tableau de bord Supabase, clique sur **Add user** et crée un compte avec ton email et un mot de passe. C'est ce compte qui se connecte sur `/admin` — il n'y a pas d'inscription publique, volontairement.

### 4. Utiliser l'admin

Va sur `/admin`, connecte-toi, puis :
- filtre par opérateur / type,
- ajoute un pack (le formulaire s'adapte selon Internet / Mix / Transfert),
- modifie ou supprime un pack existant,
- bascule "Visible sur le site" pour masquer un pack sans le supprimer.

Les changements sont visibles immédiatement sur les pages publiques (Pass Internet, Pass Mix, Transfert d'unité), sans redéploiement.

### Comportement sans Supabase configuré

Si `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` sont absents, le catalogue public continue de fonctionner avec les données d'exemple codées dans `src/data/passes.js`, et `/admin` affiche un message expliquant qu'il faut configurer Supabase. C'est pratique pour tester le site sans backend, mais l'admin ne devient utilisable qu'une fois Supabase branché.

### Sécurité (RLS)

`supabase/schema.sql` active Row Level Security : n'importe qui peut lire les packs marqués `active = true` (catalogue public), mais seul un utilisateur connecté (ton compte admin) peut créer, modifier, supprimer ou voir les packs masqués. La clé `anon` utilisée côté frontend est donc sûre à exposer publiquement.

## Catalogue de pass

Les offres (`src/data/passes.js`) sont des **données d'exemple** — noms,
volumes de données et prix sont illustratifs. Remplace-les par les vrais
tarifs de chaque opérateur avant la mise en ligne.

## Déploiement

Une option simple et gratuite pour démarrer :
- **Frontend** : [Vercel](https://vercel.com) ou [Netlify](https://netlify.com) — build command `npm run build`, dossier `dist`.
- **Backend** : [Render](https://render.com) ou [Railway](https://railway.app) — démarre `node index.js` dans `server/`, avec les variables d'environnement ci-dessus.

Une fois déployé, mets à jour :
- `VITE_API_URL` (frontend) avec l'URL du backend déployé.
- `APP_BASE_URL` et `CORS_ORIGIN` (backend) avec l'URL du frontend déployé.

## Stockage des commandes

`server/store.js` enregistre les commandes dans un simple fichier JSON —
pratique pour démarrer, mais les données seraient perdues à chaque
redéploiement. Pour la production, remplace-le par une vraie base de
données (Postgres, SQLite, MongoDB…).

## Stack technique

- React 19 + React Router 7 + Tailwind CSS 4 + Vite (frontend)
- Supabase (base de données + authentification pour le catalogue et l'espace admin)
- Node + Express, axios, nodemailer (backend paiement / contact)
