const express = require("express");
const app = express();
app.use(express.json())
const multer = require("multer");
const db = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const loginRoute = require("./routes/loginRoute");
const port = process.env.PORT || 5100;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/question', questionRoute);
// app.use('/answer', answerRoute);

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});