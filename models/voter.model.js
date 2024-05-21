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
		age: {
			type: Number,
			required: true
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female", "other"]
		},
		contact: {
			type: String,
			required: true
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		fingerprint: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Voter", userSchema);
