const B2 = require("backblaze-b2");

const b2 = new B2({
	applicationKeyId: "005791d0ff189810000000002",
	applicationKey: "K005RS3vg6Gg6zjtH1Xd+tI/AdfE0JA"
});
b2.authorize()
	.then(() => {
		console.log("Authorized backblaze b2");
	})
	.catch((error) => {
		console.log("Error authorizing b2");
	});

const uploadFile = async (file) => {
	const bucketResponse = await b2.getBucket({
		bucketName: "MoinShahid"
	});
	
	// Get the upload URL
	const uploadUrlResponse = await b2.getUploadUrl({
		bucketId: bucketResponse.data.buckets[0].bucketId
	});
	console.log(file);
	const fileName = file.originalname.split(".");

	// Upload the file
	const uploadFileResponse = await b2.uploadFile({
		uploadUrl: uploadUrlResponse.data.uploadUrl,
		uploadAuthToken: uploadUrlResponse.data.authorizationToken,
		fileName: `${Date.now()}_media.${fileName[fileName.length - 1]}`,
		data: file.buffer,
		onUploadProgress: null
	});

	return `https://moinshahid.s3.us-east-005.backblazeb2.com/${uploadFileResponse.data.fileName}`;
};

module.exports = {
	uploadFile
};
