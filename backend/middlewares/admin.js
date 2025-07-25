// Middleware pour vérifier si l'utilisateur est admin

module.exports = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res
        .status(403)
        .json({ message: "Accès réservé aux administrateurs." });
};
