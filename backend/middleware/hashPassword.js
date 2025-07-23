const bcrypt = require("bcrypt");

const hashPassword = async (req, res, next) => {
    if (!req.body.password) return next();

    try {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashed;
        next();
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Erreur de hash du mot de passe" });
    }
};

module.exports = hashPassword;
