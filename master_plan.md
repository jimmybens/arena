# THE ARENA

## Master Product Document (White Paper Opérationnel)

**Rôle** : Chief Product Officer (CPO) & CTO – Venture Building RMG / Social Apps
**Positionnement** : *"Strava du Betting"* – Plateforme **P2P de tournois de pronostics** (non‑bookmaker)
**Principe cardinal** : **Les joueurs jouent entre eux. La plateforme n’est jamais contrepartie.**

---

## 1. VISION & PRINCIPES FONDATEURS

### 1.1 Thèse Produit

THE ARENA est une **infrastructure neutre d’organisation de compétitions de pronostics sportifs**, combinant :

* Social graph (rooms, classements, observabilité)
* Game design multi‑profils (6 modes canoniques)
* Économie **P2P à cagnotte fermée**
* SaaS Tournament‑as‑a‑Service pour organisateurs tiers

> Nous ne vendons pas le risque sportif.
> Nous vendons **la structuration du jeu, du timing et du classement**.

### 1.2 Différenciation structurante

| Bookmaker               | THE ARENA                      |
| ----------------------- | ------------------------------ |
| B2C – risque maison     | P2P pur, aucune exposition     |
| Gains indexés aux cotes | Gains issus d’une cagnotte     |
| Joueur isolé            | Social & compétitif            |
| Cotes financières       | Cotes = coefficients de points |

---

## 2. MODÈLE ÉCONOMIQUE P2P (CAGNOTTE & COMMISSION)

### 2.1 Cave & Cagnotte

* Chaque joueur verse une **cave unique** au lancement de la partie/room/saison
* La somme des caves constitue une **cagnotte verrouillée**
* Aucun pari unitaire, aucun cash‑out individuel

```
Cagnotte brute = Σ caves joueurs
```

### 2.2 Commission Plateforme

La plateforme prélève une **commission sur la cagnotte**, jamais sur un gain individuel.

| Plan              | Commission sur cagnotte |
| ----------------- | ----------------------- |
| Rookie            | 8–10 %                  |
| Captain           | 5–6 %                   |
| Grinder           | 2–4 %                   |
| Room Organisateur | +5–20 % (revenue share) |

```
Cagnotte nette = Cagnotte brute – Commission totale
```

---

## 3. RÔLE DES COTES (ODDS) – CLARIFICATION DÉFINITIVE

### 3.1 Nature des Cotes

Les cotes :

* **ne représentent jamais un gain**
* **ne sont jamais multipliées par de l’argent**
* servent uniquement à mesurer la **difficulté relative** d’un événement

### 3.2 Bet‑Lock (Redéfini)

> Le **coefficient de points** associé à un événement est figé au moment de la sélection.

Objectif : récompenser **le timing et la lecture du marché**, uniquement en points.

---

## 4. SCORE ENGINE (CŒUR PRODUIT)

### 4.1 Formule Générale

```
Score Joueur = Σ (Résultat_event × Coefficient_event × Modificateurs_bonus)
```

* Résultat_event ∈ {0,1} ou score discret
* Coefficient_event = fonction de la cote (Bet‑Lock)
* Bonus = multiplicateurs / protections

### 4.2 Classement

* Classement **strictement ordinal**
* Aucune valeur monétaire directe d’un score
* Seul le **rang final** déclenche la redistribution

---

## 5. REDISTRIBUTION DE LA CAGNOTTE

### 5.1 Clés de Répartition (paramétrables)

**Top Heavy (compétitif)**

| Rang | %    |
| ---- | ---- |
| 1    | 50 % |
| 2    | 25 % |
| 3    | 15 % |
| 4–10 | 10 % |

**Flat (communautaire)**

| Rang     | %            |
| -------- | ------------ |
| Top 20 % | partage égal |

**Winner Takes All** (rooms privées uniquement)

> Les règles sont **figées au lancement** de la partie.

---

## 6. ARCHITECTURE GAMEPLAY – 6 MODES CANONIQUES

### 6.1 Classic (Casual)

* Grille 1N2
* Score = nb de bons picks
* Redistribution large

### 6.2 Custom (Stratège)

* Marchés spécifiques
* Pondération par coefficients
* Forte différenciation skill

### 6.3 Freestyle (Risque)

* Combinaisons
* Variance élevée de points
* Peu de gagnants

### 6.4 Poker Live (Trader)

* Stack = points
* Gestion temps réel
* Classement par performance relative

### 6.5 Battle Royale (Rétention)

* 1 pick/jour
* Élimination progressive
* Survivants se partagent la cagnotte

### 6.6 Duel Express (P2P)

* 1vs1, caves identiques
* Score comparatif
* Le gagnant capte X % de la cagnotte nette

---

## 7. GAMIFICATION – BONUS TACTIQUES

### 7.1 Typologie

* Bouclier (annule un échec)
* Attaque (impose un pick)
* x2 (double pondération)
* Freeze (blocage temporaire)

### 7.2 Matrice de Compatibilité

| Bonus \ Mode | Classic | Custom | Freestyle | Poker Live | Battle Royale | Duel |
| ------------ | ------- | ------ | --------- | ---------- | ------------- | ---- |
| Bouclier     | ✔️      | ✔️     | ❌         | ❌          | ✔️            | ❌    |
| Attaque      | ❌       | ✔️     | ✔️        | ❌          | ❌             | ✔️   |
| x2           | ✔️      | ✔️     | ✔️        | ❌          | ❌             | ✔️   |
| Freeze       | ❌       | ❌      | ❌         | ✔️         | ❌             | ✔️   |

---

## 8. BUSINESS MODEL HYBRIDE

### 8.1 Freemium

| Tier    | Prix  | Accès                     |
| ------- | ----- | ------------------------- |
| Rookie  | 0 €   | Classic, Battle Royale    |
| Captain | ~5 €  | Custom, Freestyle, No Ads |
| Grinder | ~10 € | Real Money Rooms          |

### 8.2 B2B2C – Organisateurs

* Création de rooms privées
* Paramétrage règles, caves, clés de gains
* Commission : 5–20 %

---

## 9. ARCHITECTURE DATA & TECH

### 9.1 Smart Cost Data

* Pré‑match : snapshots H‑1 (API)
* Live : WebSocket uniquement pour modes premium

### 9.2 Stack

* Front : Flutter
* Back : Node.js (NestJS)
* DB : PostgreSQL
* Realtime : Redis + WebSocket
* Paiements : PSP + Wallet interne
* KYC : Phase 3

---

## 10. ROADMAP CRESCENDO (PRODUIT)

**Phase 1** : Social gratuit (M0–M3) – acquisition, PMF soft
**Phase 2** : SaaS (M4–M6) – monétisation features (sans argent réel)
**Phase 3** : Real Money P2P (M7–M12) – wallet, KYC, conformité
**Phase 4** : Scale international (M12+) – industrialisation, multi-pays

---

## 10bis. PLAN OPÉRATIONNEL IT (EXÉCUTION PRÉCISE PAR PHASE)

> Objectif : une roadmap **exécutable par une équipe + agents IA**, avec livrables, critères d’acceptation et prérequis techniques.

### 10bis.0 Standards transverses (obligatoires dès J1)

* **Monorepo** (apps + services + infra) ou multi-repos (frontend/backend/infra) mais conventions strictes.
* **CI/CD** : lint + tests + build + déploiement auto vers env *dev/stage/prod*.
* **Environnements** : *dev* (rapide), *stage* (réplique prod), *prod*.
* **Observabilité** : logs structurés + métriques + tracing (MVP minimal mais présent).
* **Sécurité** : secrets manager, RBAC minimal, audit logs sur actions sensibles.
* **Product analytics** : événements clés instrumentés dès Phase 1.

---

### PHASE 1 — Social gratuit (M0–M3)

**But** : livrer un produit social jouable gratuitement, générant rétention et données, sans argent.

#### A. Périmètre fonctionnel minimal (MVP Phase 1)

1. **Onboarding & identité**

* Login email + OTP (ou OAuth Google/Apple)
* Profil : pseudo, avatar, bio courte
* Paramètres : notifications, privacy basique

2. **Social graph v1**

* Follow/Unfollow
* Feed : activité (join room, score, victoire)
* Likes/commentaires v1 (optionnel mais recommandé)

3. **Rooms & tournois (sans argent)**

* Créer/rejoindre une room publique
* Tournoi hebdo “Classic” (1N2) + “Battle Royale” (survivor) en points
* Règles figées au lancement (format, calendrier, scoring, récompenses virtuelles)

4. **Score Engine v1**

* Calcul points deterministe (Classic + Battle Royale)
* Bet-Lock version *points* (snapshot cote/coef au moment du pick)
* Anti-triche basique : timestamp + verrouillage des picks à T-1

5. **Classements & profils**

* Leaderboard room + global
* Historique des tournois joués

6. **Notifications**

* Push/email : début tournoi, rappel pick, résultats

7. **Ads (Rookie)**

* Simple (bannières) + feature flag

#### B. Infra & data (smart cost dès Phase 1)

* **Odds Snapshot** H-1 : cron qui récupère événements + cotes/coeffs et les stocke
* **Aucun live** en Phase 1
* Modèle de données stable : events, markets, snapshots, picks, scores

#### C. Architecture technique cible (Phase 1)

* Front Flutter : app iOS/Android (web optionnel)
* Back Node/NestJS :

  * API Gateway (REST)
  * Service Tournoi (rooms, règles, calendrier)
  * Service Scoring (batch job + endpoints)
  * Service Odds Snapshot (cron)
* PostgreSQL : schéma multi-tenant rooms
* Redis (optionnel phase 1) : cache classements

#### D. Sprints détaillés (12 semaines)

**Sprint 0 (Semaine 1) — Foundations**

* Repo + conventions + CI/CD
* Auth + user service skeleton
* Schéma DB initial + migrations
* Analytics events plan (tracking spec)

**Sprint 1 (Semaines 2–3) — Rooms & tournoi Classic v0**

* CRUD rooms + join/leave
* Calendrier tournoi hebdo (scheduler)
* UI création/consultation room

**Sprint 2 (Semaines 4–5) — Picks & Bet-Lock points**

* Import events + odds snapshot H-1
* Pick submission + lock avant kickoff
* UI grille Classic

**Sprint 3 (Semaines 6–7) — Scoring + Leaderboards**

* Score engine deterministic
* Leaderboard room + global
* Profil joueur (historique)

**Sprint 4 (Semaines 8–9) — Battle Royale**

* Règles survivor (élimination journalière)
* UI battle royale + notifications
* Anti-triche basique (cutoff)

**Sprint 5 (Semaines 10–11) — Social graph & feed**

* Follow + feed activité
* Notifications sociales

**Sprint 6 (Semaine 12) — Hardening & release**

* Tests E2E critiques
* Observabilité minimale en prod
* Feature flags + rollout
* Store readiness (iOS/Android)

#### E. Critères de réussite (Go/No-Go Phase 1)

* Produit jouable : Classic + Battle Royale en rooms
* 99% des calculs de score reproductibles (deterministic)
* 0 incident critique de triche “facile” (picks hors délai)
* Funnels instrumentés (onboarding→join room→1er pick→fin tournoi)
* Coût data maîtrisé (snapshot only)

---

### PHASE 2 — SaaS (M4–M6)

**But** : monétiser sans argent réel via features premium + modes avancés.

#### A. Périmètre minimal

* Paywall abonnements (Captain)
* No-Ads + customisation
* Modes : **Custom** + **Freestyle** (points)
* Bonus tactiques (bouclier/x2/attaque) avec caps
* Rooms privées (invitation, modération)

#### B. Sprints (8–10 semaines)

* Billing (Apple/Google) + entitlement service
* Bonus engine + matrice compatibilité
* Custom markets UI + scoring pondéré
* Freestyle combinés + scoring multiplicatif (points)
* Rooms privées + liens d’invite + moderation tools

#### C. Critères de réussite

* Conversion Captain mesurée (cohortes)
* Zéro impact sur scoring deterministe
* Anti-abus bonus (caps + audit logs)

---

### PHASE 3 — Real Money P2P (M7–M12)

**But** : ajouter cagnotte, commission, redistribution, KYC/PSP, conformité.

#### A. Périmètre minimal

* Wallet interne : dépôts/retraits + ledger
* Paiements : PSP (cards/SEPA) + webhooks robustes
* KYC : provider + règles (seuils, pays)
* Mécanique **cave** + escrow par room
* Rake/commission selon abonnement
* Redistribution automatique selon rang
* Modes payants : **Duel Express** + **Poker Live** (points) + rooms cash
* Anti-collusion : règles + signaux (multi-compte, patterns)

#### B. Architecture additionnelle

* Service Wallet/Ledger (double-entry)
* Service Payments (PSP adapters)
* Service Compliance (KYC, limits, AML ruleset)
* Event bus interne (ex: Redis streams / NATS / Kafka selon scale)

#### C. Critères de réussite

* Ledger reconcilié (0 écart) + idempotency partout
* KYC flow complet + refus géré
* Redistribution exacte et auditée
* Incident response + journaux complets

---

### PHASE 4 — Scale / International (M12+)

**But** : industrialiser, réduire coût marginal, multi-pays/multi-sports.

#### Périmètre type

* Multi-tenant full + white-label organisateurs
* Localisation + multi-devise
* Optimisation perf leaderboards (streaming)
* Fraude avancée (graph, device fingerprint)
* Data warehouse + experimentation platform

---

## 10ter. MODE OPÉRATOIRE “AGENTS IA” (RECOMMANDÉ)

### Rôles d’agents

* **Agent PM/Spec** : rédige PRD + user stories + critères d’acceptation
* **Agent Architect** : ADRs (Architecture Decision Records), schémas, conventions
* **Agent Backend** : endpoints, services, tests
* **Agent Frontend** : Flutter UI + state mgmt + tests
* **Agent QA** : plans de test, tests E2E, fuzzing scoring
* **Agent DevOps** : IaC, CI/CD, monitoring, secrets

### Artefacts obligatoires pour piloter les agents

* Backlog unique (tickets) : *Definition of Ready / Definition of Done*
* Specs en Markdown versionnées
* Contrats API (OpenAPI) + mocks
* Données de test déterministes (fixtures)
* Checklists sécurité & conformité par phase

---

## 11. GOUVERNANCE & RISQUES

* Pas d’exposition financière plateforme
* Logs complets (anti‑collusion)
* Séparation stricte points / argent

---

## SYNTHÈSE

THE ARENA est un **moteur de tournois P2P à enjeu financier**, fondé sur :

* le **skill relatif**,
* le **timing**,
* la **stratégie**,
* et une **économie de cagnotte transparente**.
