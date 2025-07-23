# 📚 Documentation Backend – GabFits

## 🧩 Les classes (entités)

### 1. User

Représente tous les utilisateurs de l'application (adhérents, coachs, administrateurs).

-   **id** : ObjectId – identifiant unique généré par MongoDB
-   **name** : string – nom complet
-   **email** : string – email (unique)
-   **password** : string – mot de passe haché
-   **role** : string – `"member"`, `"coach"` ou `"admin"`
-   **createdAt** : Date – date d’inscription

**Relations :**

-   Un utilisateur peut réserver plusieurs cours → relation avec **Booking**
-   Un coach peut créer plusieurs cours → relation avec **Course**
-   Un utilisateur peut avoir plusieurs paiements → relation avec **Payment**

---

### 2. Course

Représente un cours de sport proposé (ex: Zumba, CrossFit…).

-   **id** : ObjectId
-   **title** : string – titre du cours
-   **description** : string – texte descriptif
-   **coachId** : ObjectId – référence au coach (**User**)
-   **schedule** : Date – date/heure du cours
-   **capacity** : number – nombre de places disponibles

**Relations :**

-   Un cours est animé par un coach (**User**)
-   Un cours peut avoir plusieurs réservations (**Booking**)

---

### 3. Booking

Représente une réservation de cours faite par un utilisateur.

-   **id** : ObjectId
-   **userId** : ObjectId – utilisateur ayant réservé
-   **courseId** : ObjectId – cours réservé
-   **bookingDate** : Date – date de réservation
-   **status** : string – `"pending"`, `"confirmed"`, `"cancelled"`

**Relations :**

-   Lie **User** et **Course**
-   Permet de savoir qui a réservé quoi et quand

---

### 4. Payment

Représente un paiement effectué (ex : abonnement, réservation payante…).

-   **id** : ObjectId
-   **userId** : ObjectId – utilisateur ayant payé
-   **amount** : number – montant payé
-   **paymentDate** : Date
-   **method** : string – `"card"`, `"paypal"`, etc.
-   **status** : string – `"completed"`, `"failed"`

**Relations :**

-   Associé à un **User**

---

## 🔗 Relations principales (cardinalités)

| Relation                   | Description                                       |
| -------------------------- | ------------------------------------------------- |
| 1 User ➝ n Bookings        | Un utilisateur peut faire plusieurs réservations  |
| 1 User (coach) ➝ n Courses | Un coach peut créer plusieurs cours               |
| 1 Course ➝ n Bookings      | Un cours peut être réservé plusieurs fois         |
| 1 User ➝ n Payments        | Un utilisateur peut effectuer plusieurs paiements |

---

## 📦 À quoi ça sert pour toi ?

-   Comprendre et organiser ta base **MongoDB**
-   Créer plus facilement les modèles **Mongoose**
-   Identifier les collections et les relations clés
-   Préparer une bonne structure pour les routes API (`/users`, `/courses`, `/bookings`, `/payments`…)
