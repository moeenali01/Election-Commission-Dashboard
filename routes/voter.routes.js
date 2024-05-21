const express = require("express");
const router = express.Router();
const voterController = require("../controllers/voter.controller");
const { verifyToken } = require("../middlewares/authorization");
const uploadMulter = require("../middlewares/upload");

router.post("/add", verifyToken, uploadMulter, voterController.create);
router.get("/", verifyToken, voterController.getAll);
router.get("/:id", verifyToken, voterController.get);
router.delete("/:id", verifyToken, voterController.delete);
router.put("/:id", verifyToken, voterController.edit);

module.exports = router;
