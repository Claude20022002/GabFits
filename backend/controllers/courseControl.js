const Course = require("../models/courseModel");

// Fonction pour créer un nouveau cours
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

// Fonction pour obtenir tous les cours
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("coach", "name email");
        res.status(200).json({
            message: "Liste des cours récupérée avec succès.",
            courses,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
        res.status(500).json({
            message: "Erreur serveur lors de la récupération des cours.",
        });
    }
};
// Fonction pour obtenir un cours par son ID
exports.getCourseById = async (req, res) => {
    const courseId = req.params.id;

    try {
        const course = await Course.findById(courseId).populate(
            "coach",
            "name email"
        );
        if (!course) {
            return res.status(404).json({
                message: "Cours non trouvé.",
            });
        }
        res.status(200).json({
            message: "Cours récupéré avec succès.",
            course,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération du cours :", error);
        res.status(500).json({
            message: "Erreur serveur lors de la récupération du cours.",
        });
    }
};
// Fonction pour mettre à jour un cours
exports.updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const { title, description, schedule, price, capacity } = req.body;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { title, description, schedule, price, capacity },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                message: "Cours non trouvé.",
            });
        }

        res.status(200).json({
            message: "Cours mis à jour avec succès.",
            course: updatedCourse,
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du cours :", error);
        res.status(500).json({
            message: "Erreur serveur lors de la mise à jour du cours.",
        });
    }
};
// Fonction pour supprimer un cours
exports.deleteCourse = async (req, res) => {
    const courseId = req.params.id;

    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({
                message: "Cours non trouvé.",
            });
        }

        res.status(200).json({
            message: "Cours supprimé avec succès.",
        });
    } catch (error) {
        console.error("Erreur lors de la suppression du cours :", error);
        res.status(500).json({
            message: "Erreur serveur lors de la suppression du cours.",
        });
    }
};
// Fonction pour rechercher des cours par titre
exports.searchCourses = async (req, res) => {
    const { query } = req.query;

    try {
        const courses = await Course.find({
            title: { $regex: query, $options: "i" }, // Recherche insensible à la casse
        }).populate("coach", "name email");

        res.status(200).json({
            message: "Résultats de la recherche récupérés avec succès.",
            courses,
        });
    } catch (error) {
        console.error("Erreur lors de la recherche des cours :", error);
        res.status(500).json({
            message: "Erreur serveur lors de la recherche des cours.",
        });
    }
};
// Fonction pour obtenir les cours d'un coach spécifique
exports.getCoursesByCoach = async (req, res) => {
    const coachId = req.params.coachId;

    try {
        const courses = await Course.find({ coach: coachId }).populate(
            "coach",
            "name email"
        );

        if (courses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours trouvé pour ce coach.",
            });
        }

        res.status(200).json({
            message: "Cours du coach récupérés avec succès.",
            courses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours du coach :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours du coach.",
        });
    }
};
// Fonction pour obtenir les cours à venir
exports.getUpcomingCourses = async (req, res) => {
    try {
        const currentDate = new Date();
        const upcomingCourses = await Course.find({
            schedule: { $gte: currentDate },
        })
            .populate("coach", "name email")
            .sort({ schedule: 1 }); // Tri par date de début

        if (upcomingCourses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours à venir trouvé.",
            });
        }

        res.status(200).json({
            message: "Cours à venir récupérés avec succès.",
            courses: upcomingCourses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours à venir :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours à venir.",
        });
    }
};
// Fonction pour obtenir les cours passés
exports.getPastCourses = async (req, res) => {
    try {
        const currentDate = new Date();
        const pastCourses = await Course.find({
            schedule: { $lt: currentDate },
        })
            .populate("coach", "name email")
            .sort({ schedule: -1 }); // Tri par date de fin

        if (pastCourses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours passé trouvé.",
            });
        }

        res.status(200).json({
            message: "Cours passés récupérés avec succès.",
            courses: pastCourses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours passés :",
            error
        );
        res.status(500).json({
            message: "Erreur serveur lors de la récupération des cours passés.",
        });
    }
};
// Fonction pour obtenir les cours par prix
exports.getCoursesByPrice = async (req, res) => {
    const { minPrice, maxPrice } = req.query;

    try {
        const courses = await Course.find({
            price: { $gte: minPrice || 0, $lte: maxPrice || Number.MAX_VALUE },
        }).populate("coach", "name email");

        if (courses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours trouvé dans cette plage de prix.",
            });
        }

        res.status(200).json({
            message: "Cours récupérés avec succès par prix.",
            courses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par prix :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par prix.",
        });
    }
};
// Fonction pour obtenir les cours par capacité
exports.getCoursesByCapacity = async (req, res) => {
    const { minCapacity, maxCapacity } = req.query;

    try {
        const courses = await Course.find({
            capacity: {
                $gte: minCapacity || 0,
                $lte: maxCapacity || Number.MAX_VALUE,
            },
        }).populate("coach", "name email");

        if (courses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours trouvé dans cette plage de capacité.",
            });
        }

        res.status(200).json({
            message: "Cours récupérés avec succès par capacité.",
            courses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par capacité :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par capacité.",
        });
    }
};
// Fonction pour obtenir les cours par date de création
exports.getCoursesByCreationDate = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const query = {};
        if (startDate) {
            query.createdAt = { $gte: new Date(startDate) };
        }
        if (endDate) {
            query.createdAt = { ...query.createdAt, $lte: new Date(endDate) };
        }

        const courses = await Course.find(query)
            .populate("coach", "name email")
            .sort({ createdAt: -1 });

        if (courses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours trouvé dans cette plage de dates.",
            });
        }

        res.status(200).json({
            message: "Cours récupérés avec succès par date de création.",
            courses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par date de création :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par date de création.",
        });
    }
};
// Fonction pour obtenir les cours par description
exports.getCoursesByDescription = async (req, res) => {
    const { query } = req.query;

    try {
        const courses = await Course.find({
            description: { $regex: query, $options: "i" }, // Recherche insensible à la casse
        }).populate("coach", "name email");

        if (courses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours trouvé avec cette description.",
            });
        }

        res.status(200).json({
            message: "Cours récupérés avec succès par description.",
            courses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par description :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par description.",
        });
    }
};
// Fonction pour obtenir les cours par coach
exports.getCoursesByCoachName = async (req, res) => {
    const { coachName } = req.query;

    try {
        const courses = await Course.find().populate("coach", "name email");
        const filteredCourses = courses.filter((course) =>
            course.coach.name.toLowerCase().includes(coachName.toLowerCase())
        );

        if (filteredCourses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours trouvé pour ce coach.",
            });
        }

        res.status(200).json({
            message: "Cours récupérés avec succès par nom de coach.",
            courses: filteredCourses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par nom de coach :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par nom de coach.",
        });
    }
};
// Fonction pour obtenir les cours par ID de coach
exports.getCoursesByCoachId = async (req, res) => {
    const coachId = req.params.coachId;

    try {
        const courses = await Course.find({ coach: coachId }).populate(
            "coach",
            "name email"
        );

        if (courses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours trouvé pour ce coach.",
            });
        }

        res.status(200).json({
            message: "Cours récupérés avec succès par ID de coach.",
            courses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par ID de coach :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par ID de coach.",
        });
    }
};
// Fonction pour obtenir les cours par ID de coach et date de création
exports.getCoursesByCoachAndCreationDate = async (req, res) => {
    const coachId = req.params.coachId;
    const { startDate, endDate } = req.query;

    try {
        const query = { coach: coachId };
        if (startDate) {
            query.createdAt = { $gte: new Date(startDate) };
        }
        if (endDate) {
            query.createdAt = { ...query.createdAt, $lte: new Date(endDate) };
        }

        const courses = await Course.find(query)
            .populate("coach", "name email")
            .sort({ createdAt: -1 });

        if (courses.length === 0) {
            return res.status(404).json({
                message:
                    "Aucun cours trouvé pour ce coach dans cette plage de dates.",
            });
        }

        res.status(200).json({
            message:
                "Cours récupérés avec succès par ID de coach et date de création.",
            courses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par ID de coach et date de création :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par ID de coach et date de création.",
        });
    }
};
// Fonction pour obtenir les cours par ID de coach et description
exports.getCoursesByCoachAndDescription = async (req, res) => {
    const coachId = req.params.coachId;
    const { query } = req.query;

    try {
        const courses = await Course.find({
            coach: coachId,
            description: { $regex: query, $options: "i" },
        }).populate("coach", "name email");

        if (courses.length === 0) {
            return res.status(404).json({
                message:
                    "Aucun cours trouvé pour ce coach avec cette description.",
            });
        }

        res.status(200).json({
            message:
                "Cours récupérés avec succès par ID de coach et description.",
            courses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par ID de coach et description :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par ID de coach et description.",
        });
    }
};
// Fonction pour obtenir les cours par ID de coach et nom de coach
exports.getCoursesByCoachAndName = async (req, res) => {
    const coachId = req.params.coachId;
    const { coachName } = req.query;

    try {
        const courses = await Course.find({ coach: coachId }).populate(
            "coach",
            "name email"
        );
        const filteredCourses = courses.filter((course) =>
            course.coach.name.toLowerCase().includes(coachName.toLowerCase())
        );

        if (filteredCourses.length === 0) {
            return res.status(404).json({
                message: "Aucun cours trouvé pour ce coach avec ce nom.",
            });
        }

        res.status(200).json({
            message:
                "Cours récupérés avec succès par ID de coach et nom de coach.",
            courses: filteredCourses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par ID de coach et nom de coach :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par ID de coach et nom de coach.",
        });
    }
};
// Fonction pour obtenir les cours par ID de coach et prix
exports.getCoursesByCoachAndPrice = async (req, res) => {
    const coachId = req.params.coachId;
    const { minPrice, maxPrice } = req.query;

    try {
        const courses = await Course.find({
            coach: coachId,
            price: { $gte: minPrice || 0, $lte: maxPrice || Number.MAX_VALUE },
        }).populate("coach", "name email");
        if (courses.length === 0) {
            return res.status(404).json({
                message:
                    "Aucun cours trouvé pour ce coach dans cette plage de prix.",
            });
        }
        res.status(200).json({
            message: "Cours récupérés avec succès par ID de coach et prix.",
            courses,
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des cours par ID de coachet prix :",
            error
        );
        res.status(500).json({
            message:
                "Erreur serveur lors de la récupération des cours par ID de coach et prix.",
        });
    }
};
