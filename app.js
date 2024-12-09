require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json())
const multer = require("multer");
const db = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const subjectRoute = require("./routes/subjectRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");

const port = process.env.LOCAL_PORT || 5100;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoute);
app.use('/question', questionRoute);
app.use("/subject", subjectRoute);
app.use('/answer', answerRoute);
// app.use('/', (req, res, next) => {
// 	return res.status(200).json({
// 		message: "Welcome to EDUCONNECT!",
// 	})
// });
app.listen(port, () => {
	console.log(`App running on port ${port}`);
});