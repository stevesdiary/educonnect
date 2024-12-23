require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const { Server } = require('socket.io');
app.use(express.json())
const http = require('http');
const multer = require("multer");
const setupChatSocket = require('./socket/chatSocket');
const db = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const subjectRoute = require("./routes/subjectRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const server = http.createServer(app);
const port = process.env.LOCAL_PORT || 5200;
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || `http://localhost:${port}`,
    methods: ["GET", "POST"]
  }
});

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
// 	});
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
