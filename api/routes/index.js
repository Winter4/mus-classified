const express = require("express");

const authenticate = require("../middleware/authenticate");
const requiresAuth = require("../middleware/requiresAuth");
const errorHandler = require("../middleware/errorHandler");

const userController = require("../controllers/User");
const imageController = require("../controllers/Image");
const advertisementController = require("../controllers/Advertisement");

const router = express.Router();

router.use(authenticate);

router.post("/users/register", userController.register);
router.post("/users/authorize", userController.authorize);

router.post("/images/upload", requiresAuth, imageController.upload);

router.post("/ads/add", requiresAuth, advertisementController.add);
router.get("/ads/getAll", advertisementController.getAll);
router.get("/ads/get", advertisementController.get);

router.all("*", (req, res) => {
  res.status(404).json({ error: 404 })
});

router.use(errorHandler);

module.exports = router;