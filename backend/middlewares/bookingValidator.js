// Middleware pour valider les données d'une réservation

module.exports = (req, res, next) => {
    const { courseId, bookingDate, status } = req.body;
    // Vérifie la présence du cours
    if (!courseId) {
        return res
            .status(400)
            .json({ message: "Le champ courseId est requis." });
    }
    // Vérifie la validité de la date de réservation si fournie
    if (bookingDate && isNaN(Date.parse(bookingDate))) {
        return res
            .status(400)
            .json({ message: "La date de réservation est invalide." });
    }
    if (bookingDate && new Date(bookingDate) < new Date()) {
        return res
            .status(400)
            .json({
                message: "La date de réservation doit être dans le futur.",
            });
    }
    // Vérifie le statut si fourni
    const allowedStatus = ["pending", "confirmed", "cancelled"];
    if (status && !allowedStatus.includes(status)) {
        return res
            .status(400)
            .json({ message: "Le statut de réservation est invalide." });
    }
    next();
};
