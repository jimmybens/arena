# AI VibeCoding Architecture: Next.js + Supabase + Prisma (Multi-Schema Serverless)

**Contexte pour l'IA** : Ce document est la source de vérité pour recréer l'architecture de bout en bout d'un projet web robuste et hautement scalable. L'objectif est de mettre en place un pipeline de développement et déploiement fluide utilisant Vercel, Supabase (avec Pooler) et Prisma v7+, capable de gérer deux environnements stricts (Development/Preview et Production) avec *une seule instance physique de base de données*.

Tu dois suivre ces instructions à la lettre pour chaque nouveau projet de ce type.

---

## 1. Stack Technique Cible
- **Framework** : Next.js (App Router, Turbopack actif)
- **ORM** : Prisma (v7+)
- **Base de données** : PostgreSQL via Supabase (avec gestion de connexion via Supavisor Pooler port 6543)
- **Adaptateur DB** : `@prisma/adapter-pg` + `pg` (Node Postgres) pour fonctionner de manière fiable en environnement Serverless.
- **Hébergement** : Vercel
- **Authentification** : NextAuth.js (Auth.js) avec Prisma Adapter

---

## 2. Architecture des Bases de Données (Supabase)

Il est impératif d'utiliser la fonctionnalité de "scénarios par schémas" de PostgreSQL plutôt que de hardcoder quoi que ce soit dans l'ORM.
- **Production** : Utilise le schéma natif `public`.
- **Développement & Preview** : Utilise un schéma séparé nommé `dev`.

### Les URL de Connexion
Supabase fournit un routeur de connexion (pooler). L'URL de transaction est sur le port `6543`.
- `DATABASE_URL` pointant sur `dev` : `postgresql://[USER]:[PASS]@[HOST]:6543/postgres?sslmode=require&supavisor_session=true&schema=dev`
- `DATABASE_URL` pointant sur `public` : `postgresql://[USER]:[PASS]@[HOST]:6543/postgres?sslmode=require&supavisor_session=true&schema=public`
- `DIRECT_URL` (Port 5432, indispensable pour les migrations) calquée sur la Database URL.

---

## 3. Configuration Vercel & Environnements

Avant de déployer, tu dois impérativement t'assurer que le Dashboard Vercel (ou le `.env.local`) contient les bonnes variables.

- **Local (`.env.local`)** : `DATABASE_URL` (schema=dev), `DIRECT_URL` (schema=dev)
- **Vercel de Preview/Development** : `DATABASE_URL` (schema=dev), `DIRECT_URL` (schema=dev)
- **Vercel de Production (Branche `main`)** : `DATABASE_URL` (schema=public), `DIRECT_URL` (schema=public)

*(Ne jamais hardcoder l'URL de prod pour un environnement Preview)*.

---

## 4. Pièges Prisma & Solutions (CRITIQUE)

Prisma avec le pg-adapter se comporte différemment de la version native. Si tu n'appliques pas ces règles strictes, l'application crashera en production avec *"The table does not exist"*.

1. **Pas de `multiSchema` Preview Feature** : Ne PAS inclure `previewFeatures = ["multiSchema"]` dans `prisma/schema.prisma`.
2. **Pas de Hardcodage de Schéma** : Ne JAMAIS ajouter le décorateur `@@schema("dev")` ou `@@schema("public")` sur les modèles Prisma. Prisma doit rester agnostique vis-à-vis du schéma cible.
3. **Extraction et Injection du Schéma dans l'Adaptateur** : Par défaut, le driver `pg` dans un pool ne passe pas le contexte de son schéma à Prisma. Tu DOIS instancier Prisma avec le schéma extrait directement depuis l'URL de connexion.

### 📜 Le code parfait (à reproduire dans `src/lib/prisma.ts`) :

```typescript
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Lire la connexion et enlever les potentiels conflits SSL de Vercel/Supabase
const connectionString = `${process.env.DATABASE_URL}`.replace(
  /\?sslmode=require&?|&sslmode=require/g, 
  function(match) { return match.startsWith('?') && match.endsWith('&') ? '?' : ''; }
);

// 2. Extraire le ?schema=xxx depuis l'URL (Capital)
const url = new URL(connectionString);
const schema = url.searchParams.get('schema') || 'public';

// 3. Pooler Node-pg
const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false } 
});

// 4. Prisma Adapter (injection forcée du schéma cible)
const adapter = new PrismaPg(pool, { schema });

const globalForPrisma = global as unknown as { prisma_v3: PrismaClient };

export const prisma =
  globalForPrisma.prisma_v3 ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma_v3 = prisma;
```

---

## 5. Workflow Git (Le Guide du Dev Solo)

Tu feras adopter à l'utilisateur humain le workflow simplifié exclusif à Vercel :

- **Pas de branche `dev` locale**.
- Tout se fait sur **`main`**.
- **Création Feature** : On checkout une branche `$ git checkout -b feature/nom-de-feature`.
- **Validation** : On commit et on push la branche. Vercel intercepte cela et lance une Preview sur le schéma `dev`.
- **Mise en prod** : On merge sur `main` et on pousse `origin main`. Vercel déploiera sur le schéma `public`.

---

## 6. Seed et Migrations

Rappelle à l'utilisateur ou exécute en bash :
Pour pousser le schéma Prisma, le faire deux fois pour synchroniser les deux mondes (puisque nous avons un seul fichier Prisma agnostique).
```bash
# Synchro Dev
$env:DATABASE_URL="...schema=dev"; npx prisma db push

# Synchro Prod
$env:DATABASE_URL="...schema=public"; npx prisma db push
```

Même logique pour un fichier `seed.ts` s'il est nécessaire. Pense à extraire le `schema` (cf point 4) si tu utilises `@prisma/adapter-pg` dans le fichier de seed, sinon il cherchera la table dans le schéma public et échouera.
