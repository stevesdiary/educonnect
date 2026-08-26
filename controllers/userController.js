const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { userService } = require('../services/userService');
const { User, Verification } = require('../models');
const { createUserSchema, updateUserSchema } = require('../validator/validator');
const { saveToRedis, getFromRedis } = require('../config/redisConfig');
const sendVerificationEmail = require('../services/emailService');

const salt = 10;
const domain = process.env.DOMAIN;

const userController = {
  registerUser: async (req, res, next) => {
    try {
      const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: 'Validation Error', errors: error.details });
      }
      const { name, username, email, password, confirm_password, profile_picture, gender, phone, birthdate, role, subscribed } = value;

      if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ message: `Email ${email} already exists, please login.` });
      }
      const usernameExists = await User.findOne({ where: { username } });
      if (usernameExists) {
        return res.status(400).json({ message: `Username ${username} already taken, choose another.` });
      }

      const hashed = await bcrypt.hash(password, salt);
      const payload = { name, username, email, password: hashed, profile_picture, gender: gender.toLowerCase(), phone, birthdate, role, subscribed };

      const verificationCode = crypto.randomInt(100000, 999999).toString().padStart(6, '0');
      const createUser = await userService.createUser(payload);

      await Verification.create({
        email,
        code: verificationCode,
        expires_at: new Date(Date.now() + 15 * 60 * 1000),
      });

      await saveToRedis(email, verificationCode, 600);

      const emailResponse = await sendVerificationEmail({
        email,
        subject: 'EduConnect Email Verification',
        text: `Your verification code is: ${verificationCode}\nVerify here: ${domain}?email=${email}&code=${verificationCode}\nExpires in 10 minutes.`,
      });

      return res.status(createUser.status).json({
        message: createUser.message,
        emailMessage: emailResponse.message,
        data: createUser.data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while creating the user', error: error.message });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { email, code } = req.query;
      const storedCode = await getFromRedis(email);
      if (!storedCode) {
        return res.status(404).json({ message: 'Verification code invalid or expired' });
      }
      if (storedCode !== code) {
        return res.status(400).json({ message: 'Incorrect verification code' });
      }
      await User.update({ is_verified: true }, { where: { email }, returning: true });
      const emailResponse = await sendVerificationEmail({
        email,
        subject: 'Welcome to EduConnect',
        text: 'Your email has been successfully verified.',
      });
      return res.status(200).json({ message: 'Email verified successfully, proceed to login', data: emailResponse });
    } catch (error) {
      console.error('verifyEmail error:', error);
      return res.status(500).json({ message: 'An error occurred during email verification', error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const { error, value } = updateUserSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: 'Validation Error', errors: error.details });
      }
      const result = await userService.update(id, value);
      return res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await userService.getAll(req.query);
      return res.status(users.status).json({ message: users.message, data: users.data });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const result = await userService.getOne(req.params.id);
      return res.status(result.status).json({ message: result.message, ...(result.data && { data: result.data }) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const result = await userService.deleteOne(req.params.id);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  },
};

module.exports = { userController };
