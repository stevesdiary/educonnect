require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json())
const multer = require("multer");
const db = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const subjectRoute = require("./routes/subjectRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");

const port = 5200;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);
app.use('/question', questionRoute);
app.use("/subject", subjectRoute);
app.use('/answer', answerRoute);
app.get('/', (req, res, next) => {
	try {
		res.sendFile(path.join(__dirname, 'welcome.html'));
	} catch (error) {
		console.log(error);
		throw error;
	}
	
});
app.listen(port, () => {
	console.log(`App running on port ${port}`);
});