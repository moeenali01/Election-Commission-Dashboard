const Voter = require("../models/voter.model");
const { uploadFile } = require("../services/backblaze.service");

exports.create = async function (req, res) {
	try {
		const newVoter = new Voter(req.body);
    if (req.file) {
      newVoter.image = uploadFile(req.files[0]);
    }
		const voter = await newVoter.save();
		res.status(200).send({ message: "Voter created successfully", result: voter });
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: err.message, result: null });
	}
};

exports.getAll = async function (req, res) {
  try {
    const voters = await Voter.find({});
    res.status(200).send({ message: "Voters retrieved successfully", result: voters });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message, result: null });
  }
};

exports.get = async function (req, res) {
  try {
    const voter = await Voter.findById(req.params.id);
    res.status(200).send({ message: "Voter retrieved successfully", result: voter });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message, result: null });
  }
};

exports.edit = async function (req, res) {
  try {
    const voter = await Voter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ message: "Voter updated successfully", result: voter });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message, result: null });
  }
};

exports.delete = async function (req, res) {
  try {
    const voter = await Voter.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Voter deleted successfully", result: voter });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message, result: null });
  }
};
