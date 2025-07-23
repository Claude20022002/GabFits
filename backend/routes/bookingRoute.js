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
// Rechercher des réservations par utilisateur
router.get("/user/:userId", auth, bookingController.getBookingsByUser);
// Rechercher des réservations par cours
router.get("/course/:courseId", auth, bookingController.getBookingsByCourse);
// Rechercher des réservations par statut
router.get("/status/:status", auth, bookingController.getBookingsByStatus);
// Rechercher des réservations par date de réservation
router.get(
    "/booking-date/:date",
    auth,
    bookingController.getBookingsByBookingDate
);
// Rechercher des réservations par date de création
router.get(
    "/creation-date/:date",
    auth,
    bookingController.getBookingsByCreationDate
);

module.exports = router;
