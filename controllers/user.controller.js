const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User controller

function addDays(date, days) {
	days = parseInt(days[0]);
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result.getTime();
}

exports.signIn = async function (req, res) {
	try {
		const user = await User.findOne({ cnic: req.body.cnic });

		if (!user) {
			throw new Error("Cannot find user");
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);

		if (!isMatch) {
			throw new Error("Incorrect password");
		}

		const payload = {
			id: user._id,
			cnic: user.cnic,
		};

		const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "1d"
		});

		const tokenExpiry = addDays(new Date(), process.env.ACCESS_TOKEN_EXPIRY);

		return res.status(200).send({
			message: "Sign in successful",
			result: { token, tokenExpiry }
		});

	} catch (err) {
		return res.status(400).send({ message: err.message, result: false });
	}
};

exports.create = async function (req, res) {
	try {
		// req.body.createdBy = req.user.id;
		const newUser = new User(req.body);
		const password = newUser.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		newUser.password = hash;
		const student = await newUser.save();
		res.send(student);
	} catch (err) {
		console.log(err);
		res.status(400).send({
			message: "Error hashing password",
			result: { err, hash: null, password }
		});
	}
};

exports.edit = async function (req, res) {
	try {
		// Find the user by their ID
		// let user = await User.findById(req.params.id);
		let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

		// If the user is not found, send an error response
		// if (!user) {
		// 	throw new Error("Cannot find user");
		// }

		// Update the user with the provided information
		// user.name = req.body.name || user.name;
		// user.username = req.body.username || user.username;
		// user.cnic = req.body.cnic || user.cnic;
		// user.password = req.body.password || user.password;

		// Save the updated user information to the database
		// let result = await user.save();

		// Send a success response with updated user information
		res.status(200).send({ message: "User updated successfully", result: user });
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: err.message, result: false });
	}
};


exports.delete = async function (req, res) {
	try {
		// Find the user by their ID
		let user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			throw new Error("User not found");
		}
		// Send a success response with deleted user information
		res.status(200).send({ message: "User deleted successfully", result: user });
	} catch (err) {
		// If the user is not found, send an error response
		return res.status(400).send({ message: err.message, result: false });
	}
};

exports.getAll = async function (req, res) {
	try {
		// Find all users in the database
		const users = await User.find({}).select("-password");

		// Send a success response with all users
		res.status(200).send({
			message: "Users retrieved successfully",
			result: users
		});
	} catch (err) {
		res.status(400).send({ message: err.message, result: false });
	}
};

exports.get = async function (req, res) {
	try {
		// Find the user by their ID
		const user = await User.findById(req.params.id).select("-password");

		// If the user is not found, send an error response
		if (user == null) {
			return res.status(400).send({ message: "Cannot find user", result: false });
		}

		// Send a success response with the user
		res.status(200).send({
			message: "User retrieved successfully",
			result: user
		});
	} catch (err) {
		res.status(400).send({ message: err.message, result: false });
	}
};

exports.userDetails = async function (req, res) {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.status(200).send({
			message: "User retrieved successfully",
			result: user
		});
	} catch (err) {
		res.status(400).send({ message: err.message, result: false });
	}
};
