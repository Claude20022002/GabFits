// Middleware pour valider les données d'un cours

module.exports = (req, res, next) => {
    const { title, description, schedule, capacity } = req.body;
    // Pour la création, le coach est injecté via req.user.id par le contrôleur
    const coachId = req.body.coachId || (req.user && req.user.id);
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
