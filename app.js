require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const { Server } = require('socket.io');
app.use(express.json())
const http = require('http');
const errorHandler = require('./middlewares/errorHandler');
const setupChatSocket = require('./socket/chatSocket');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const userRoute = require('./routes/userRoute');
const subjectRoute = require('./routes/subjectRoute');
const questionRoute = require('./routes/questionRoute');
const answerRoute = require('./routes/answerRoute');
const loginRoute = require('./routes/loginRoute');
const server = http.createServer(app);
const port = process.env.LOCAL_PORT || 5200;
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || `http://localhost:${port}`,
    methods: ["GET", "POST"]
  }
});

app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);
app.use('/question', questionRoute);
app.use('/subject', subjectRoute);
app.use('/answer', answerRoute);
app.use('/auth', loginRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res, next) => {
	try {
		res.sendFile(path.join(__dirname, 'welcome.html'));
	} catch (error) {
		console.log(error);
		throw error;
	}
});

setupChatSocket(io);

app.use(errorHandler);

server.listen(port, () => {
	console.log(`App running on port ${port}`);
});
