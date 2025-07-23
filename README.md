# GabFits

Site web d'une salle de sport proposant plusieurs services

# Arborescence du projet:

fitzone-app/
├── backend/
│ ├── config/
│ │ └── db.js # Connexion à la BDD (MongoDB, MySQL ou Oracle)
│
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── courseController.js
│ │ ├── bookingController.js
│ │ └── paymentController.js
│
│ ├── middleware/
│ │ ├── authMiddleware.js # Vérifie le token JWT
│ │ └── errorHandler.js
│
│ ├── models/
│ │ ├── User.js # Schémas pour MongoDB
│ │ ├── Course.js
│ │ ├── Booking.js
│ │ └── Payment.js
│
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── courseRoutes.js
│ │ ├── bookingRoutes.js
│ │ └── paymentRoutes.js
│
│ ├── utils/
│ │ └── generateToken.js # JWT
│
│ ├── app.js # App Express principale
│ └── server.js # Démarrage du serveur
│
│ ├── .env
│ ├── package.json
│ └── README.md
│
├── frontend/
│ ├── public/
│ │ └── favicon.ico
│
│ ├── src/
│ │ ├── api/
│ │ │ └── axiosClient.js
│ │
│ │ ├── components/
│ │ │ ├── layout/
│ │ │ │ ├── Header.jsx
│ │ │ │ └── Sidebar.jsx
│ │ │ └── shared/
│ │ │ ├── Loader.jsx
│ │ │ └── Error.jsx
│ │
│ │ ├── features/
│ │ │ ├── auth/
│ │ │ │ ├── Login.jsx
│ │ │ │ ├── Register.jsx
│ │ │ │ └── authAPI.js
│ │ │ ├── courses/
│ │ │ │ ├── CoursesList.jsx
│ │ │ │ ├── CreateCourse.jsx
│ │ │ │ └── coursesAPI.js
│ │ │ ├── bookings/
│ │ │ │ └── BookCourse.jsx
│ │ │ └── payments/
│ │ │ └── PaymentHistory.jsx
│ │
│ │ ├── hooks/
│ │ │ └── useAuth.js
│ │
│ │ ├── router/
│ │ │ └── routes.jsx
│ │
│ │ ├── services/
│ │ │ └── authService.js
│ │
│ │ ├── store/
│ │ │ └── userStore.js
│ │
│ │ ├── styles/
│ │ │ └── index.css
│ │
│ │ ├── utils/
│ │ │ └── dateFormatter.js
│ │
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │
│ ├── .env
│ ├── vite.config.js
│ ├── package.json
│ └── README.md
│
└── README.md # README global (monorepo)
