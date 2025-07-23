const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Enregistrement d'un nouvel utilisateur
// Vérifie si l'utilisateur existe déjà et enregistre un nouvel utilisateur
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Utilisateur déjà inscrit." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec succès." });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({
            message: "Erreur serveur lors de l'inscription.",
        });
    }
};

// Connexion de l'utilisateur
// Vérifie les identifiants et génère un token JWT
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Utilisateur non trouvé. Veuillez vous inscrire.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Mot de passe ou email incorrect." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "2h",
        });

        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({
            message: "Erreur serveur lors de la connexion.",
        });
    }
};

// Obtenir le profil de l'utilisateur (avec sécurité)
exports.getProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Mise à jour du profil d'utilisateur (avec sécurité)
exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Vérifier si l'email est modifié et existe déjà
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res
                    .status(400)
                    .json({ message: "Cet email est déjà utilisé." });
            }
            user.email = email;
        }

        // Modifier le nom s'il est fourni
        if (name) {
            user.name = name;
        }

        // Modifier le mot de passe si demandé
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({
                    message: "Veuillez fournir le mot de passe actuel.",
                });
            }

            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password
            );
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Mot de passe actuel incorrect." });
            }

            const hashed = await bcrypt.hash(newPassword, 12);
            user.password = hashed;
        }

        const updatedUser = await user.save();
        const userWithoutPassword = updatedUser.toObject();
        delete userWithoutPassword.password;

        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Supprimer un utilisateur (avec confirmation)
exports.deleteProfile = async (req, res) => {
    const userId = req.user.id;
    const { password } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect." });
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du profil :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Admin: Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé." });
    }
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des utilisateurs :",
            error
        );
        res.status(500).json({ message: "Erreur serveur." });
    }
};
