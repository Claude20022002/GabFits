const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentControl");

// Middleware pour vérifier l'authentification de l'utilisateur
const auth = require("../middlewares/auth");
// Middleware pour vérifier si l'utilisateur est admin
const admin = require("../middlewares/admin");

// Route pour créer un paiement (utilisateur connecté)
router.post("/", auth, paymentController.createPayment);

// Route pour obtenir les paiements d'un utilisateur spécifique (admin ou propriétaire uniquement)
router.get("/user/:userId", auth, paymentController.getPaymentsByUser);

// Route pour obtenir les détails d'un paiement spécifique (admin ou propriétaire uniquement)
router.get("/:paymentId", auth, paymentController.getPaymentDetails);

// Route pour mettre à jour le statut d'un paiement (admin uniquement)
router.put(
    "/:paymentId/status",
    auth,
    admin,
    paymentController.updatePaymentStatus
);

// Route pour supprimer un paiement (admin uniquement)
router.delete("/:paymentId", auth, admin, paymentController.deletePayment);

// Route pour obtenir tous les paiements (admin uniquement)
router.get("/admin", auth, admin, paymentController.getAllPayments);

module.exports = router;
