# 📚 GabFits – Documentation Backend

Bienvenue dans le backend de GabFits, la plateforme de gestion pour salle de sport.

---

## 🚀 Démarrage rapide

### 1. Prérequis

-   Node.js (v18+ recommandé)
-   MongoDB (local ou distant)
-   npm

### 2. Installation

```bash
git clone https://github.com/ton-utilisateur/GabFits.git
cd GabFits/backend
npm install
```

### 3. Configuration

Crée un fichier `.env` à la racine du dossier `backend` :

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/gabfits
JWT_SECRET=une_chaine_secrete
JWT_EXPIRES_IN=1h
NODE_ENV=development
```

### 4. Lancer le serveur

```bash
npm start
# ou en développement :
npx nodemon index.js
```

Le serveur sera accessible sur [http://localhost:5000](http://localhost:5000).

---

## 🗂️ Structure du projet

```
backend/
├── config/           # Configuration (connexion BDD)
├── controllers/      # Logique métier (User, Course, Booking, Payment)
├── middlewares/      # Middlewares (auth, admin, validation)
├── models/           # Schémas Mongoose
├── routes/           # Définition des routes API
├── utils/            # Fonctions utilitaires (JWT, etc.)
├── app.js            # Configuration Express
├── index.js          # Point d'entrée du serveur
├── .env              # Variables d'environnement
└── package.json
```

---

## 🧩 Les entités principales

### User

-   **Champs** : id, name, email, password, role (`member`, `coach`, `admin`), createdAt
-   **Relations** : réservations, paiements, cours (si coach)

### Course

-   **Champs** : id, title, description, coachId, price, schedule, capacity
-   **Relations** : coach, réservations

### Booking

-   **Champs** : id, userId, courseId, bookingDate, status (`pending`, `confirmed`, `cancelled`)
-   **Relations** : utilisateur, cours

### Payment

-   **Champs** : id, userId, amount, paymentDate, method, status
-   **Relations** : utilisateur

---

## 🔐 Authentification & Sécurité

-   Authentification via JWT (token dans l'en-tête Authorization)
-   Middleware `auth` : protège les routes nécessitant une connexion
-   Middleware `admin` : protège les routes réservées aux administrateurs
-   Les routes sensibles vérifient que l'utilisateur est propriétaire ou admin

---

## 📡 Endpoints principaux

### Utilisateurs

-   `POST /api/users/register` : inscription
-   `POST /api/users/login` : connexion
-   `GET /api/users/profile` : profil utilisateur (auth)
-   `PUT /api/users/profile` : modifier profil (auth)
-   `DELETE /api/users/profile` : supprimer profil (auth)
-   `GET /api/users/users` : liste des utilisateurs (admin)

### Cours

-   `POST /api/courses/create` : créer un cours (admin)
-   `GET /api/courses/` : liste des cours
-   `GET /api/courses/:id` : détail d'un cours
-   `PUT /api/courses/:id` : modifier un cours (admin)
-   `DELETE /api/courses/:id` : supprimer un cours (admin)

### Réservations

-   `POST /api/bookings/` : réserver un cours (auth)
-   `GET /api/bookings/` : liste des réservations (admin)
-   `GET /api/bookings/user/:userId` : réservations d'un utilisateur (auth/admin)
-   `GET /api/bookings/course/:courseId` : réservations d'un cours (auth/admin)
-   `PUT /api/bookings/:id` : modifier une réservation (auth/admin)
-   `DELETE /api/bookings/:id` : annuler une réservation (auth/admin)

### Paiements

-   `POST /api/payments/` : créer un paiement (auth)
-   `GET /api/payments/user/:userId` : paiements d'un utilisateur (auth/admin)
-   `GET /api/payments/:paymentId` : détail d'un paiement (auth/admin)
-   `PUT /api/payments/:paymentId/status` : changer le statut (admin)
-   `DELETE /api/payments/:paymentId` : supprimer (admin)

---

## 🧪 Tests

-   Utilise Postman ou Thunder Client pour tester les endpoints.
-   Les tokens JWT sont nécessaires pour les routes protégées.

---

## 🛠️ Bonnes pratiques

-   Les mots de passe sont hashés avec bcrypt.
-   Les erreurs sont gérées et renvoient des messages explicites.
-   Les rôles sont vérifiés pour chaque action sensible.
-   Les données sont validées côté backend.

---

## 📦 À quoi ça sert pour toi ?

-   Comprendre et organiser ta base **MongoDB**
-   Créer plus facilement les modèles **Mongoose**
-   Identifier les collections et les relations clés
-   Préparer une bonne structure pour les routes API (`/users`, `/courses`, `/bookings`, `/payments`…)

---

## 🤝 Contribution

1. Fork le repo
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit tes changements
4. Push et ouvre une Pull Request

---

## 📞 Besoin d'aide ?

Ouvre une issue sur le repo ou contacte le mainteneur.
