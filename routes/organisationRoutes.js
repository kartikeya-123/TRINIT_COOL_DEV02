const express = require("express");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");
const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.get("/all", teamController.getAllOrganisations);
router.post("/create", teamController.createOrganisation);
router.get("/teams", teamController.getTeamsOfOrganisation);
module.exports = router;
