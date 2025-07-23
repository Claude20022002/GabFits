# GabFits

Site web d'une salle de sport proposant plusieurs services : réservation de cours, gestion des membres, paiements, espace coach/admin, etc.

---

## 🌳 Arborescence du projet

```
GabFits/
├── backend/
│   ├── config/           # Connexion à la BDD
│   ├── controllers/      # Logique métier (User, Course, Booking, Payment)
│   ├── middlewares/      # Middlewares (auth, admin, validation)
│   ├── models/           # Schémas Mongoose
│   ├── routes/           # Définition des routes API
│   ├── utils/            # Fonctions utilitaires (JWT, etc.)
│   ├── app.js            # Configuration Express
│   ├── index.js          # Démarrage du serveur
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/          # Appels API (axiosClient.js)
│   │   ├── components/   # Composants React (layout, shared, features)
│   │   ├── hooks/        # Hooks personnalisés
│   │   ├── router/       # Définition des routes frontend
│   │   ├── services/     # Services (auth, etc.)
│   │   ├── store/        # Gestion d'état utilisateur
│   │   ├── styles/       # Fichiers CSS
│   │   ├── utils/        # Fonctions utilitaires
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── .env
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
└── README.md             # README global (monorepo)
```

---

## 🚀 Technologies utilisées

-   **Frontend** :

    -   React JS
    -   MUI (Material UI)
    -   TanStack (Query, Table, Router)
    -   Axios
    -   React Router

-   **Backend** :

    -   Node JS
    -   Express
    -   JWT
    -   ORM/ODM (Mongoose ou Sequelize ou node-oracledb)

-   **Base de données** :
    -   MongoDB

---

## ⚙️ Installation et démarrage

### 1. Cloner le projet

```bash
git clone https://github.com/ton-utilisateur/GabFits.git
cd GabFits
```

### 2. Installer les dépendances

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Configurer les variables d'environnement

#### Backend (`backend/.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/gabfits
JWT_SECRET=une_chaine_secrete
JWT_EXPIRES_IN=1h
NODE_ENV=development
```

#### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:5000/api
```

### 4. Lancer le projet

#### Backend

```bash
cd backend
npm start
# ou en développement :
npx nodemon index.js
```

#### Frontend

```bash
cd frontend
npm run dev
```

---

## 🧩 Fonctionnalités principales

### Utilisateurs

-   Inscription, connexion sécurisée (JWT)
-   Gestion des rôles : membre, coach, administrateur
-   Profil utilisateur modifiable

### Cours

-   Création, modification, suppression de cours (admin/coach)
-   Consultation des cours disponibles
-   Recherche, filtrage, tri

### Réservations

-   Réserver un cours (membre)
-   Annuler ou modifier une réservation
-   Historique des réservations

### Paiements

-   Paiement en ligne (Stripe/PayPal possible)
-   Historique des paiements
-   Gestion des statuts (admin)

### Espace coach/admin

-   Gestion des cours
-   Suivi des membres et réservations
-   Statistiques de fréquentation

---

## 🔐 Sécurité

-   Authentification JWT
-   Middlewares pour protéger les routes sensibles
-   Vérification des rôles pour les actions critiques
-   Validation des données côté backend

---

## 📡 Endpoints principaux (Backend)

-   `/api/users/` : gestion des utilisateurs
-   `/api/courses/` : gestion des cours
-   `/api/bookings/` : gestion des réservations
-   `/api/payments/` : gestion des paiements

Voir le README du backend pour le détail des routes.

---

## 🛠️ Bonnes pratiques

-   Code commenté et structuré
-   Gestion des erreurs centralisée
-   Séparation claire frontend/backend
-   Utilisation de l’async/await pour les appels asynchrones

---

## 🧪 Tests

-   Utilisez Postman ou Thunder Client pour tester les endpoints backend.
-   Les tokens JWT sont nécessaires pour les routes protégées.

---

## 🤝 Contribution

1. Fork le repo
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit tes changements
4. Push et ouvre une Pull Request

---

## 📞 Support

Pour toute question, ouvre une issue sur le repo
