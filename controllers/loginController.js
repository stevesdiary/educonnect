const { User } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const tokenExpiry = process.env.TOKEN_EXPIRY || '5hours';
const axios = require("axios");
const { CLIENT_ID, REDIRECT_URI } = process.env;

const loginController = {
  login: async (req, res) => {
    try {
      const sessions = {};
      const session_id = uuidv4();
      let { email, password } = req.body;
      email = email.trim();
      const userData = await User.findOne({ where: { email } });
      console.log("Querying user with email:", email);

      if (userData === null) {
        return res.status(404).send({ Message: "Email is not registered or not correct" });
      }

      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (!passwordMatch) {
        return res.status(401).send({ Message: "Password is not correct, please provide the correct password." });
      }

      const id = userData.id;
      const userInfo = {
        id: userData.id,
        email: userData.email,
      };
      const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: tokenExpiry });
      sessions[session_id] = { email, id: userData.id };
      res.set('Set-Cookie', `session=${session_id}`);
      
      return res.status(200).json({
        statusCode: 200,
        id,
        email: sessions.email,
        token: accessToken,
      });
    } catch (err) {
      console.log('Error occurred:', err);
      return res.status(500).send({ message: `User unable to login`, error: err });
    }
  },

  logout: async (req, res) => {
    try {
      const session_id = req.headers.cookie;
      if (session_id) {
        // await redisClient.del(session_id);
        res.clearCookie('session');
      }
      return res.status(200).send('Bye 👋, you have successfully logged out');
    } catch (error) {
      console.log("Error", error);
      return res.status(500).send({ message: 'An error occurred', error });
    }
  },

  google: async (req, res) => {
    try {
      const url =  `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
      res.redirect(url);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { loginController };
