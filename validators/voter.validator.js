const { check, validationResult } = require("express-validator");

const validateVoter = [
	check("name").notEmpty().withMessage("Name is required"),

	check("cnic")
		.notEmpty()
		.withMessage("CNIC is required")
		.isLength({ min: 13, max: 13 })
		.withMessage("CNIC must be 13 characters long"),

	check("age")
		.notEmpty()
		.withMessage("Age is required")
		.isInt({ min: 18 })
		.withMessage("Age must be at least 18"),

	check("gender")
		.notEmpty()
		.withMessage("Gender is required")
		.isIn(["male", "female", "other"])
		.withMessage("Gender must be one of the following: male, female, or other"),

	check("contact")
		.notEmpty()
		.withMessage("Contact is required")
		.isMobilePhone()
		.withMessage("Invalid contact number"),

	check("createdBy")
		.notEmpty()
		.withMessage("Creator is required")
		.isMongoId()
		.withMessage("Invalid creator ID"),

	check("fingerprint").notEmpty().withMessage("Fingerprint is required"),
];

module.exports = validateVoter;
