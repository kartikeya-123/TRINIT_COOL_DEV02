const express = require("express");
const authController = require("../controllers/authController");
const bugController = require("../controllers/bugController");

const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

// router.get("/assigned", bugController.getMyBugs);
// router.get("/resolved", bugController.getResolvedBugs);
router.get("/:bugId", bugController.getBug);
router.post("/team/:teamId", bugController.createBug);
router.patch("/assign/:bugId", bugController.assignBug);
router.patch("/resolve/:bugId", bugController.resolveBug);

module.exports = router;
