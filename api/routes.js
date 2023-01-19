const express = require("express");
const errorHandler = require("./middleware/errorHandler");

const userController = require("./controllers/User");

const router = express.Router();

router.post("/register", userController.register);
router.post("/authorize", userController.authorize);

router.all("*", (req, res) => {
  res.status(404).json({ error: 404 })
});

router.use(errorHandler);

module.exports = router;