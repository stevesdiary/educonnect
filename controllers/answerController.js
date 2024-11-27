const { User, Answer } = require('../models');
const { Op } = require('sequelize');
const { answerService } = require('../services/answerService');
const { answerSchema } = require("../validator/validator");
// const validate 
const bcrypt = require("bcrypt");
const { userService } = require('../services/userService');
const salt = 10;
const answerController = {
	createAnswer: async (req, res, next) => {
		try {
			const { error, value } = answerSchema.validate(req.body, { abortEarly: false });
			if (error) {
				console.log('ValidationError', error);
				return res.status(400).json({ message: error.details[0].message });
			}
			const { content, file_url } = req.body;
			const user_id = req.user.id;
			const question_id = req.params.question_id;
			console.log("question_id", question_id);

			const payload = { content, user_id, question_id, file_url };
			const createAnswer = await answerService.createAnswer(payload);

			if (!createAnswer) {
				return res.status(createAnswer.status).json({ message: (createAnswer.message) });
			}
			return res.status(createAnswer.status).json({
				message: createAnswer.message,
				data: createAnswer.data,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'An error occurred while creating the answer',
				error: error
			});
		}
	},

	updateAnswer: async (req, res,) => {
		try {
			const id = req.params.id;
			const updateData = req.body;
			const answer = await answerService.findOne(id, updateData);
			if (!answer) {
				return res.status(404).json({ message: `Answer with email: ${req.params.email} not found` });
			}
			const { first_name, last_name, phone_number } = req.body;
			if (first_name !== last_name) {
				await answer.update(updateData);
				return res.status(answer.status).json({
					message: (answer.message),
					data: (answer.data)
				});
			}
		} catch (error) {
			
		}
	},

	getAll: async (req, res) => {
		try {
			const answers = await answerService.getAll();
			return res.status(answers.status).json({
				message: (answers.message),
				data: (answers.data)
			});
		} catch (error) {
			console.error("Error fetching answers:", error);
				return res.status(500).json({
					message: 'Internal Server Error',
					error: error
				});
		}
	},

	getOne: async (req, res) => {
		try {
			const result = await answerService.getOne(req.params.id);
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
			return res.status(500).json({
				message : "Error showed up",
				error : error.message || error
			})
		}
	},

	deleteOne: async (req, res) => {
		try {
			const result = await answerService.deleteOne(req.params.id);
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

module.exports = { answerController };
