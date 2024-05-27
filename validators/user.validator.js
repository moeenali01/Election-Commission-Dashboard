const { check, validationResult } = require("express-validator");

const validateUser = [
	check("name").notEmpty().withMessage("Name is required"),
	check("cnic")
		.notEmpty()
		.withMessage("CNIC is required")
		.isLength({ min: 13, max: 13 })
		.withMessage("CNIC must be 13 characters long")
		.custom(async (value) => {
			const user = await User.findOne({ cnic: value });
			if (user) {
				throw new Error("CNIC already in use");
			}
		}),
	check("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long")
];

module.exports = { validateUser };
