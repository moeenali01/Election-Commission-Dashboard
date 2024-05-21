const multer = require("multer");
const uploadMulter = multer({
	storage: multer.memoryStorage()
}).any();

module.exports = uploadMulter;
