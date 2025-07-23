const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseControl");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const courseValidator = require("../middlewares/courseValidator");

router.post(
    "/create",
    auth,
    admin,
    courseValidator,
    courseController.createCourse
);
router.get("/search", auth, courseValidator, courseController.searchCourses);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", auth, admin, courseValidator, courseController.updateCourse);
router.delete("/:id", auth, admin, courseController.deleteCourse);
router.post("/:id/enroll", auth, courseController.enrollInCourse);
router.post("/:id/unenroll", auth, courseController.unenrollFromCourse);
router.get(
    "/:id/enrolled-users",
    auth,
    admin,
    courseController.getEnrolledUsers
);
router.get("/:id/coach", auth, courseController.getCourseCoach);
router.get("/coach/:coachId", auth, courseController.getCoursesByCoach);

module.exports = router;
