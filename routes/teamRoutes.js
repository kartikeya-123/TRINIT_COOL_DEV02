const express = require("express");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");
const bugController = require("../controllers/bugController");
const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.post("/create", teamController.createTeam);
router.post("/add-members", teamController.addMembersToTeam);
router.get("/:teamId", teamController.getTeam);
router.post("/bug/:teamId", bugController.createBug);
module.exports = router;
