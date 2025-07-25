# 🧾 Cahier des charges – Application web pour une salle de sport

## 🧍‍♂️ Client fictif : FitZone

Bonjour,  
Je représente la salle de sport FitZone, et j’aimerais créer une plateforme web moderne pour améliorer la gestion de nos services et offrir une meilleure expérience à nos clients. J’aimerais que vous développiez cette application en tenant compte des besoins suivants :

---

## 🎯 Objectifs du projet

-   Offrir un espace en ligne aux adhérents pour réserver des séances ou services.
-   Permettre la gestion des coachs, abonnements, programmes personnalisés.
-   Centraliser les informations (planning, paiements, suivis).
-   Créer une interface simple, rapide et responsive.

---

## 🧩 Fonctionnalités attendues

### 1. Gestion des utilisateurs

-   ✅ Inscription, connexion sécurisée (JWT)
-   🧑‍💼 Rôles : membre, coach, administrateur
-   🔐 Profil utilisateur modifiable

### 2. Services proposés

-   💪 Coaching personnalisé
-   🕖 Réservation de séances collectives
-   🏋️‍♀️ Accès aux programmes d'entraînement
-   📅 Calendrier de cours

### 3. Espace membre

-   🔍 Voir et modifier ses infos
-   📆 Réserver une séance
-   📝 Voir ses programmes d'entraînement
-   💳 Historique des paiements

### 4. Espace coach/admin

-   📋 Créer/éditer/supprimer un cours
-   📈 Voir la fréquentation des membres
-   🧾 Gérer les abonnements et paiements

### 5. Paiements

-   Intégration avec un système comme Stripe ou PayPal
-   Paiement en ligne d’abonnement ou services

---

## ⚙️ Stack technique souhaitée

### Frontend

-   React.js
-   Utilisation de TanStack Query pour la gestion des données (réservations, cours, utilisateurs)
-   TanStack Table pour afficher des listes (cours, utilisateurs, etc.)
-   TanStack Router (optionnel) si besoin d’un routing avancé
-   Tailwind CSS ou MUI pour l’UI

### Backend

-   Node.js + Express
-   Authentification avec JWT
-   API REST (ou GraphQL si plus évolué)

### Base de données

| Technologie | Avantages                                                                | Idéal pour                                                 |
| ----------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| MySQL       | Relationnel, robuste, bien intégré avec ORMs                             | Abonnements, relations complexes                           |
| MongoDB     | Flexible, idéal pour des objets imbriqués (ex: programme d’entraînement) | Rapide à mettre en place                                   |
| Oracle      | Très puissant et professionnel, bon pour apprendre le SQL avancé         | Si tu veux te former sérieusement à l’environnement Oracle |

> **Conseil** : si tu veux apprendre Oracle, tu peux l’utiliser dans ce projet, mais cela demandera un peu plus de configuration. Sinon, MySQL est un bon compromis avec ton expérience.

---

## 🧠 Utilisation de TanStack dans ce projet

-   ✅ **TanStack Query**  
    Pour gérer les requêtes vers le backend : liste des cours, utilisateurs, paiements, etc.  
    _Avantages : cache automatique, synchronisation en temps réel, annulation auto, pagination facile._

-   ✅ **TanStack Table**  
    Afficher la liste des séances, membres, paiements, etc.  
    _Très utile pour l'espace admin : sortable, filtrable, paginable._

-   (Optionnel) **TanStack Router**  
    Si tu veux aller plus loin que React Router (data loader intégré par route, params plus typés, etc.)

-   (Futur) **TanStack Form**  
    Pour créer des formulaires modernes, typés et performants (inscription, ajout de cours, etc.)

---

## 📱 Côté responsive

-   Le site doit être mobile-friendly.
-   Possibilité d’une future app mobile avec React Native.

---

## 📆 Délai estimé

-   Version MVP (minimale viable) en 4 à 6 semaines
-   Fonctionnalités avancées et design raffiné dans un second temps

---

## 📁 Livraison attendue

-   Code source propre et commenté
-   Documentation technique (README, architecture, endpoints API)
-   Script de déploiement (ou hébergement sur Vercel + Render/Oracle Cloud)
