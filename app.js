const express = require("express");
const app = express();
app.use(express.json())
const multer = require("multer");
const db = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const port = process.env.PORT || 5500;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
	return res.status(200).json({
		message: "Welcome to EDUCONNECT!",
	})
});
app.use('/user', userRoute);

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});