const express = require("express");

const authenticate = require("../middleware/authenticate");
const requiresAuth = require("../middleware/requiresAuth");
const requiresAdmin = require("../middleware/requiresAdmin");
const requiresModer = require("../middleware/requiresModer");
const requiresExpert = require("../middleware/requiresExpert");
const errorHandler = require("../middleware/errorHandler");

const userController = require("../controllers/User");
const imageController = require("../controllers/Image");
const advertisementController = require("../controllers/Advertisement");
const categoryController = require("../controllers/Category");
const manufacturerController = require("../controllers/Manufacturer");
const instrumentModelController = require("../controllers/InstrumentModel");
const messageController = require("../controllers/Message");

const router = express.Router();

router.use(authenticate);

// пользователи
router.post("/users/register", userController.register);
router.post("/users/authorize", userController.authorize);
router.get("/users/getSelf", requiresAuth, userController.getSelf);
router.get("/users/getAll", [requiresAuth, requiresAdmin], userController.getAll);
router.post("/users/editAdmin", [requiresAuth, requiresAdmin], userController.editAdmin);
router.post("/users/editSelf", requiresAuth, userController.editSelf);
router.delete("/users/removeAdmin", [requiresAuth, requiresAdmin], userController.removeAdmin);

// изображения
router.post("/images/upload", requiresAuth, imageController.upload);

// объявления
router.post("/advertisements/add", requiresAuth, advertisementController.add);
router.post("/advertisements/edit", requiresAuth, advertisementController.edit);
router.get("/advertisements/getAll", advertisementController.getAll);
router.get("/advertisements/getModer", [requiresAuth, requiresModer], advertisementController.getModer);
router.post("/advertisements/editModer", [requiresAuth, requiresModer], advertisementController.editModer);
router.get("/advertisements/getExpert", [requiresAuth, requiresExpert], advertisementController.getExpert);
router.post("/advertisements/editExpert", [requiresAuth, requiresExpert], advertisementController.editExpert);
router.post("/advertisements/requestReview", requiresAuth, advertisementController.requestReview);
router.get("/advertisements/get", advertisementController.get);
router.delete("/advertisements/remove", advertisementController.remove);

// категории
router.get("/category/getAll", categoryController.getAll);
router.get("/category/get", categoryController.get);
router.post("/category/add", [requiresAuth, requiresAdmin], categoryController.add);
router.delete("/category/remove", [requiresAuth, requiresAdmin], categoryController.remove);

// производители
router.get("/manufacturer/getAll", manufacturerController.getAll);
router.get("/manufacturer/get", manufacturerController.get);
router.post("/manufacturer/add", [requiresAuth, requiresAdmin], manufacturerController.add);
router.delete("/manufacturer/remove", [requiresAuth, requiresAdmin], manufacturerController.remove);

// модели инструментов
router.get("/model/getAll", instrumentModelController.getAll);
router.post("/model/add", [requiresAuth, requiresAdmin], instrumentModelController.add);
router.delete("/model/remove", [requiresAuth, requiresAdmin], instrumentModelController.remove);

// сообщения
router.post("/message/add", requiresAuth, messageController.add);
router.get("/message/getAll", requiresAuth, messageController.getAll);

router.all("*", (req, res) => {
  res.status(404).json({ error: 404 })
});

router.use(errorHandler);

module.exports = router;