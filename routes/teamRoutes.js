const express = require("express");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");
const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.post("/create", teamController.createTeam);
router.post("/add-members", teamController.addMembersToTeam);
module.exports = router;
