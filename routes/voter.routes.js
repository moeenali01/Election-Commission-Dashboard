const express = require("express");
const router = express.Router();
const voterController = require("../controllers/voter.controller");
const { verifyToken } = require("../middlewares/authorization");
const uploadMulter = require("../middlewares/upload");
const validateVoter = require("../validators/voter.validator");
const { runValidation } = require("../validators");

router.post("/", verifyToken, uploadMulter, validateVoter, runValidation, voterController.create);
router.get("/", verifyToken, voterController.getAll);
router.get("/:id", voterController.get);
router.delete("/:id", verifyToken, voterController.delete);
router.put("/:id", verifyToken, voterController.edit);

module.exports = router;
