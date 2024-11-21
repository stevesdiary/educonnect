const express = require("express");
const app = express();
app.use(express.json())
const multer = require("multer");
const port = process.env.PORT || 5500;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
	console.log(`App running on port ${port}`);
});