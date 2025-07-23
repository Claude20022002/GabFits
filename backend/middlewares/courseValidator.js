// Middleware pour valider les données d'un cours

module.exports = (req, res, next) => {
    const { title, description, coachId, schedule, capacity } = req.body;
    if (
        !title ||
        !description ||
        !coachId ||
        !schedule ||
        typeof capacity !== "number"
    ) {
        return res
            .status(400)
            .json({ message: "Données du cours invalides ou incomplètes." });
    }
    if (capacity <= 0) {
        return res
            .status(400)
            .json({ message: "La capacité doit être supérieure à zéro." });
    }
    if (new Date(schedule) <= new Date()) {
        return res.status(400).json({
            message: "La date du cours doit être ultérieure à maintenant.",
        });
    }
    next();
};

// Middleware pour valider les données d'un cours
