const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.get("/profile", userController.aboutMe);

module.exports = router;
