const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		cnic: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		// createdBy: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "User",
		// 	required: true
		// }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
