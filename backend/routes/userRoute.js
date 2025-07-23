const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControl");
const auth = require("../Middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/profile", auth, userController.getProfile);
router.put("/profile", auth, userController.updateProfile);
router.delete("/profile", auth, userController.deleteProfile);

router.get("/users", auth, userController.getAllUsers); // à protéger si admin uniquement

module.exports = router;
