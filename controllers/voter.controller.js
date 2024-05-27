const Voter = require("../models/voter.model");
const { uploadFile } = require("../services/backblaze.service");

exports.create = async function (req, res) {
	try {
    req.body.createdBy = req.user.id;
		const newVoter = new Voter(req.body);
    if (req.files.length > 0) {
      newVoter.fingerprint = await uploadFile(req.files[0]);
    } else {
      return res.status(400).send({ message: "Fingerprint is required", result: null });
    }
    const voter = await Voter.findOne({ cnic: req.body.cnic });
    if (voter) {
      return res.status(400).send({ message: "Duplicate key error", result: null });
    }
    const voterSaved = await newVoter.save();
		return res.status(200).send({ message: "Voter created successfully", result: voterSaved });
	} catch (err) {
		console.log(err);
		return res.status(400).send({ message: err.message, result: err });
	}
};

exports.getAll = async function (req, res) {
  try {
    const voters = await Voter.find({});
    return res.status(200).send({ message: "Voters retrieved successfully", result: voters });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message, result: null });
  }
};

exports.get = async function (req, res) {
  try {
    const voter = await Voter.findById(req.params.id);
    return res.status(200).send({ message: "Voter retrieved successfully", result: voter });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message, result: null });
  }
};

exports.edit = async function (req, res) {
  try {
    const voter = await Voter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).send({ message: "Voter updated successfully", result: voter });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message, result: null });
  }
};

exports.delete = async function (req, res) {
  try {
    const voter = await Voter.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: "Voter deleted successfully", result: voter });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message, result: null });
  }
};
