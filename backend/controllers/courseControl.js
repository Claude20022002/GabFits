const Course = require("../models/courseModel");

exports.createCourse = async (req, res) => {
    const { title, description, schedule, price, capacity } = req.body;
    const coach = req.user.id; // Utiliser l'ID de l'utilisateur connecté comme coach

    try {
        const newCourse = new Course({
            title,
            description,
            coach,
            schedule,
            price,
            capacity,
        });

        await newCourse.save();
        res.status(201).json({
            message: "Cours créé avec succès.",
            course: newCourse,
        });
    } catch (error) {
        console.error("Erreur lors de la création du cours :", error);
        res.status(500).json({
            message: "Erreur serveur lors de la création du cours.",
        });
    }
};
