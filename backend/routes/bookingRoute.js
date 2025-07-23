const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingControl");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const bookingValidator = require("../middlewares/bookingValidator");

// Créer une réservation
router.post("/create", auth, bookingValidator, bookingController.createBooking);
// Obtenir toutes les réservations
router.get("/", auth, bookingController.getAllBookings);
// Obtenir une réservation par ID
router.get("/:id", auth, bookingController.getBookingById);
// Mettre à jour une réservation
router.put(
    "/:id",
    auth,
    admin,
    bookingValidator,
    bookingController.updateBooking
);
// Supprimer une réservation
router.delete("/:id", auth, admin, bookingController.deleteBooking);
// Obtenir les réservations d'un utilisateur par son ID
router.get("/user/:userId", auth, bookingController.getBookingsByUser);
// Obtenir les réservations d'un cours par son ID
router.get("/course/:courseId", auth, bookingController.getBookingsByCourse);
// Obtenir les réservations par statut
router.get("/status/:status", auth, bookingController.getBookingsByStatus);
// Obtenir les réservations par date de réservation
router.get(
    "/booking-date/:date",
    auth,
    bookingController.getBookingsByBookingDate
);
// Obtenir les réservations par date de création
router.get(
    "/creation-date/:date",
    auth,
    bookingController.getBookingsByCreationDate
);
// Annuler une réservation
router.post("/:id/cancel", auth, bookingController.cancelBooking);
// Confirmer une réservation
router.post("/:id/confirm", auth, bookingController.confirmBooking);

module.exports = router;
