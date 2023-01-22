const express = require("express");
const authenticate = require("./middleware/authenticate");
const errorHandler = require("./middleware/errorHandler");

const userController = require("./controllers/User");
const imageController = require("./controllers/Image");
const advertisementController = require("./controllers/Advertisement");

const router = express.Router();

router.use(authenticate);

router.post("/users/register", userController.register);
router.post("/users/authorize", userController.authorize);

router.post("/images/upload", imageController.upload);

router.post("/ads/add", advertisementController.add);

router.all("*", (req, res) => {
  res.status(404).json({ error: 404 })
});

router.use(errorHandler);

module.exports = router;