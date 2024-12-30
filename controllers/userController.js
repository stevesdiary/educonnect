const { User, Verification } = require('../models');
const { Op } = require('sequelize');
const { userService } = require('../services/userService');
const bcrypt = require("bcrypt");
const sendVerificationCode = require("../services/emailService");
const crypto = require("crypto");
const salt = 10;
const domain = process.env.DOMAIN
const { createUserSchema, updateUserSchema, validate } = require("../validator/validator");

const userController = {
	createUser: async (req, res, next) => {
		try {
			const { error, value } = createUserSchema.validate(req.body, { abortEarly: false }); 
			if (error) { 
				console.error('Validation Error:', error.details);
				return res.status(400).json({ message: 'Validation Error', errors: error.details }); 
			}
			const { name, username, email, password, confirm_password, profile_picture, gender, phone, birthdate, role, subscribed } = value;
			let sex = gender.toLowerCase();
			if (password !== confirm_password) {
				return res.status(400).json({ message: "Passwords do not match" });
			}
			const emailExists = await User.findOne({ where: { email } });
			if (emailExists) {
				return res.status(400).json({ 
					message: `Email ${email} already exists, please login with your password.` 
				});
			}
			const usernameExists = await User.findOne({ where: { username } });
			if (usernameExists) {
				return res.status(400).json({ 
					message: `Username ${username} already exists, choose another username (username can include numbers)` 
				});
			}
			const hashed = await bcrypt.hash(password, salt);
			const payload = { name, username, email, password: hashed, profile_picture, gender: sex, phone, birthdate, role, subscribed};
			const verificationCode = crypto
        .randomInt(100000, 999999)
        .toString()
        .padStart(6, '0');
			const createUser = await userService.createUser(payload);
			await Verification.create({
				email: email,
				code: verificationCode,
				expires_at: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
			});
			const verificationPayload = {
				email,
				code: verificationCode,
				subject: `EduConnect Email Verification`,
				text: `Your verification code is: ${verificationCode} 
      		Please click on the link below to verify your email: ' ${domain}?email=${email}&code=${verificationCode} '
      		Note that this code will expire in 10 minutes`
			}
			
			if (!createUser) {
				console.log("Error occured, user not created");
				return res.status(createUser.status).json({ message: (createUser.message) });
			}
			const emailResponse = await sendVerificationCode(verificationPayload);
			return res.status(createUser.status).json({
				message: createUser.message,
				emailMessage: emailResponse.message,
				data: createUser.data,
			});
			
		} catch (error) {
			
			console.log(error);
			return res.status(500).json({
				message: 'An error occurred while creating the user',
				error: error
			});
		}
	},
	
	verifyEmail: async (req, res) => {
		try {
			const { email, code } = req.query;
			const verificationRecord = await Verification.findOne({ 
				where: { 
					email,
					code,
					expires_at: { [Op.gt]: new Date() }
				} 
			});
			if (!verificationRecord) {
				return res.status(404).json({ message: 'Invalid or expired verification code' });
			}
			await User.update(
				{is_verified: true},
				{where: { email }}
			)
			const verificationPayload = {
				email: email,
				subject: `Welcome to EduConnect`,
				text: `Your verification email has been successfully verified.`
			}
			const emailResponse = await sendVerificationCode(verificationPayload);

			await Verification.destroy({
				where: {
					expires_at: { [Op.lt]: new Date() }
				}
			});
			return res.status(200).json({ message: "Email verified successfully, proceed to login", data: emailResponse });
		} catch (error) {
			
		}
	},

	updateUser: async (req, res,) => {
		try {
			const id = req.params.id;
			const updateData = req.body;
			const { error, value } = createUserSchema.validate(req.body, { abortEarly: false }); 
			if (error) { 
				console.error('Validation Error:', error.details);
				return res.status(400).json({ message: 'Validation Error', errors: error.details }); 
			}
			const user = await userService.update(id, updateData);
			if (!user) {
				return res.status(404).json({ message: `User with email: ${req.params.email} not found` });
			}
			const { name, username, phone } = req.body;
			if (!(name || username || phone)) {

				await user.update(updateData);
				return res.status(user.status).json({
					message: (user.message),
					data: (user.data)
				});
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Error", data: error });
		}
	},

	getAll: async (req, res) => {
		try {
			const payload = req.query;
			const users = await userService.getAll(payload);
			return res.status(users.status).json({
				message: (users.message),
				data: (users.data)
			});
		} catch (error) {
			console.error("Error fetching users:", error);
				return res.status(500).json({
					message: 'Internal Server Error',
					error: error
				});
		}
	},

	getOne: async (req, res) => {
		try {
			const result = await userService.getOne(req.params.id);
			if (!result) {
				return res.status(result.status).json({
					message: result.message,
				});
			}
			return res.status(result.status).json({
				message: (result.message),
				...(result.data && { data: result.data})
			});
		} catch (error) {
			console.log("Error", error)
			return res.status(500).json({
				message : "Error showed up",
				error : error
			})
		}
	},

	deleteOne: async (req, res) => {
		try {
			const result = await userService.deleteOne(req.params.id);
			return res.status(result.status).send({ message: (result.message)});
		} catch (error) {
			
			console.error("Error", error)
			return res.status(500).json({
				message : "Error occured",
				error : error
			})
		}
	}
};

module.exports = { userController };
