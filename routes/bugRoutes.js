const express = require("express");
const bugController = require("../controllers/bugController");

const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

// router.get("/assigned", bugController.getMyBugs);
// router.get("/resolved", bugController.getResolvedBugs);
router.post("/:teamId", bugController.createBug);

module.exports = router;
