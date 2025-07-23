const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseControl");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const courseValidator = require("../middlewares/courseValidator");

// Création d'un cours
router.post(
    "/create",
    auth,
    admin,
    courseValidator,
    courseController.createCourse
);
// Récupérer tous les cours
router.get("/", courseController.getAllCourses);
// Récupérer un cours par ID
router.get("/:id", courseController.getCourseById);
// Mettre à jour un cours
router.put("/:id", auth, admin, courseValidator, courseController.updateCourse);
// Supprimer un cours
router.delete("/:id", auth, admin, courseController.deleteCourse);
// Rechercher des cours par titre
router.get("/search", auth, courseValidator, courseController.searchCourses);
// Récupérer les cours d'un coach spécifique
router.get("/coach/:coachId", auth, courseController.getCoursesByCoach);
// Récupérer les cours à venir
router.get("/upcoming", courseController.getUpcomingCourses);
// Récupérer les cours passés
router.get("/past", courseController.getPastCourses);
// Récupérer les cours par prix
router.get("/price", courseController.getCoursesByPrice);
// Récupérer les cours par capacité
router.get("/capacity", courseController.getCoursesByCapacity);
// Récupérer les cours par date de création
router.get("/creation-date", courseController.getCoursesByCreationDate);
// Récupérer les cours par description
router.get("/description", courseController.getCoursesByDescription);
// Récupérer les cours par nom de coach
router.get("/coach-name", courseController.getCoursesByCoachName);
// Récupérer les cours par ID de coach
router.get("/coach-id/:coachId", courseController.getCoursesByCoachId);
// Récupérer les cours par ID de coach et date de création
router.get(
    "/coach/:coach/creation-date",
    courseController.getCoursesByCoachAndCreationDate
);
// Récupérer les cours par ID de coach et description
router.get(
    "/coach/:coachId/description",
    courseController.getCoursesByCoachAndDescription
);
// Récupérer les cours par ID de coach et nom de coach
router.get("/coach/:coachId/name", courseController.getCoursesByCoachAndName);
// Récupérer les cours par ID de coach et prix
router.get("/coach/:coachId/price", courseController.getCoursesByCoachAndPrice);

module.exports = router;
