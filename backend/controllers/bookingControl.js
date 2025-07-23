const Booking = require("../models/bookingModel");

// Créer une réservation
exports.createBooking = async (req, res) => {
    try {
        const { courseId, bookingDate, status } = req.body;
        const userId = req.user.id;

        const newBooking = new Booking({
            userId,
            courseId,
            bookingDate,
            status: status || "pending",
        });

        await newBooking.save();
        res.status(201).json({
            message: "Réservation créée avec succès",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Erreur lors de la création de la réservation :", error);
        res.status(500).json({
            message: "Erreur serveur lors de la création de la réservation.",
        });
    }
};

// Obtenir toutes les réservations
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("userId courseId");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des réservations :",
            error
        );
        res.status(500).json({
            message: "Erreur serveur lors de la récupération des réservations.",
        });
    }
};

// Obtenir une réservation par ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate(
            "userId courseId"
        );
        if (!booking) {
            return res
                .status(404)
                .json({ message: "Réservation non trouvée." });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération de la réservation :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération de la réservation.",
        });
    }
};

// Mettre à jour une réservation
exports.updateBooking = async (req, res) => {
    try {
        const { bookingDate, status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { bookingDate, status },
            { new: true }
        );
        if (!booking) {
            return res
                .status(404)
                .json({ message: "Réservation non trouvée." });
        }
        res.status(200).json({ message: "Réservation mise à jour.", booking });
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour de la réservation :",
            error
        );
        res.status(500).json({
            message: "Erreur serveur lors de la mise à jour de la réservation.",
        });
    }
};

// Supprimer une réservation
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res
                .status(404)
                .json({ message: "Réservation non trouvée." });
        }
        res.status(200).json({ message: "Réservation supprimée." });
    } catch (error) {
        console.error(
            "Erreur lors de la suppression de la réservation :",
            error
        );
        res.status(500).json({
            message: "Erreur serveur lors de la suppression de la réservation.",
        });
    }
};
// Obtenir les réservations d'un utilisateur
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.find({ userId }).populate("courseId");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des réservations de l'utilisateur :",
            error
        );
        res.status(500).json({
            message: "Erreur serveur lors de la récupération des réservations.",
        });
    }
};
// Obtenir les réservations d'un cours
exports.getCourseBookings = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const bookings = await Booking.find({ courseId }).populate("userId");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des réservations du cours :",
            error
        );
        res.status(500).json({
            message: "Erreur serveur lors de la récupération des réservations.",
        });
    }
};
// Annuler une réservation
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res
                .status(404)
                .json({ message: "Réservation non trouvée." });
        }
        if (booking.status === "cancelled") {
            return res
                .status(400)
                .json({ message: "Réservation déjà annulée." });
        }
        booking.status = "cancelled";
        await booking.save();
        res.status(200).json({ message: "Réservation annulée.", booking });
    } catch (error) {
        console.error("Erreur lors de l'annulation de la réservation :", error);
        res.status(500).json({
            message: "Erreur serveur lors de l'annulation de la réservation.",
        });
    }
};
// Confirmer une réservation
exports.confirmBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res
                .status(404)
                .json({ message: "Réservation non trouvée." });
        }
        if (booking.status === "confirmed") {
            return res
                .status(400)
                .json({ message: "Réservation déjà confirmée." });
        }
        booking.status = "confirmed";
        await booking.save();
        res.status(200).json({ message: "Réservation confirmée.", booking });
    } catch (error) {
        console.error(
            "Erreur lors de la confirmation de la réservation :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la confirmation de la réservation.",
        });
    }
};

// Obtenir les réservations d'un utilisateur par son ID (pour la route /user/:userId)
exports.getBookingsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Booking.find({ userId }).populate("courseId");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des réservations de l'utilisateur :",
            error
        );
        res.status(500).json({
            message: "Erreur serveur lors de la récupération des réservations.",
        });
    }
};

// Obtenir les réservations d'un cours par son ID (pour la route /course/:courseId)
exports.getBookingsByCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const bookings = await Booking.find({ courseId }).populate("userId");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des réservations du cours :",
            error
        );
        res.status(500).json({
            message: "Erreur serveur lors de la récupération des réservations.",
        });
    }
};

// Obtenir les réservations par statut (pour la route /status/:status)
exports.getBookingsByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const bookings = await Booking.find({ status }).populate(
            "userId courseId"
        );
        res.status(200).json(bookings);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des réservations par statut :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des réservations par statut.",
        });
    }
};

// Obtenir les réservations par date de réservation (pour la route /booking-date/:date)
exports.getBookingsByBookingDate = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        if (isNaN(date)) {
            return res
                .status(400)
                .json({ message: "Date de réservation invalide." });
        }
        // On cherche les réservations dont la date de réservation est ce jour-là
        const start = new Date(date.setHours(0, 0, 0, 0));
        const end = new Date(date.setHours(23, 59, 59, 999));
        const bookings = await Booking.find({
            bookingDate: { $gte: start, $lte: end },
        }).populate("userId courseId");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des réservations par date de réservation :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des réservations par date de réservation.",
        });
    }
};

// Obtenir les réservations par date de création (pour la route /creation-date/:date)
exports.getBookingsByCreationDate = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        if (isNaN(date)) {
            return res
                .status(400)
                .json({ message: "Date de création invalide." });
        }
        const start = new Date(date.setHours(0, 0, 0, 0));
        const end = new Date(date.setHours(23, 59, 59, 999));
        const bookings = await Booking.find({
            createdAt: { $gte: start, $lte: end },
        }).populate("userId courseId");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des réservations par date de création :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des réservations par date de création.",
        });
    }
};
