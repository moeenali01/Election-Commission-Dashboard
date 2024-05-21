const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authorization");

router.post("/add", userController.create);
router.post("/signin", userController.signIn);
router.get("/", verifyToken, userController.getAll);
router.get("/info", verifyToken, userController.userDetails);
router.get("/:id", verifyToken, userController.get);
router.delete("/:id", verifyToken, userController.delete);
router.put("/:id", verifyToken, userController.edit);

module.exports = router;
