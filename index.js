const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Import route stacks
const userRoutes = require("./routes/user.routes");
const voterRoutes = require("./routes/voter.routes");
// const { verifyToken, verifyRole } = require("./middlewares/authorization");
// const { logMiddleware } = require("./middlewares/log.js");

const PORT = 5000;

app.use(
	cors()
);
app.use(express.json());


mongoose.connect("mongodb+srv://moyemoye:moyemoye@ec.ppwpsl2.mongodb.net/").then(() => {
	console.log("MongoDB connected");
});

app.get("/", (req, res) => {
	res.send(`
  <h1 style="display: flex; justify-content: center">API is running...</h1>
  `);
});

// app.use(logMiddleware);
// app.use((req, res, next) => {
// 	res.on("finish", () => {
// 		const color = res.statusCode === 200 ? "\x1b[32m" : "\x1b[31m";
// 		const codeStr = `${color}${res.statusCode}\x1b[0m`;
// 		const url = req.originalUrl.substring(5);
// 		// console.log("codeStr ", codeStr);
// 		var output = [req.method, req.originalUrl, req.ip, req.user?.id, res.body];
// 		// console.log("output.join ", output);
// 		console.log(codeStr, "\x1b[32m", output.join(" "));
// 		if (req.method && req.method !== "GET") {
// 			const log = logsModel.create({
// 				action: req.method,
// 				userId: req.user?.id,
// 				message: `${req.method} ${url}`,
// 				role: req.user?.role,
// 				host: req.hostname,
// 			})
// 				// .then((e) => console.log(e)).catch((err) => console.log(err));
// 		}
// 		// log.save().then((e) => console.log(e)).catch((err) => console.log(err));
// 	});

// 	next();
// });

app.use("/api/user", userRoutes);
app.use("/api/voter", voterRoutes);

// app.use(verifyToken);

// app.get("/user", verifyRole("student"), (req, res) => {
// 	res.send(req.user);
// });

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server is running on port ${process.env.PORT || PORT}`);
});
