const { User, Question } = require('../models');
const { Op } = require('sequelize');
const questionService = require('../services/questionService');
const questionSchema = require("../validator/validator");
const bcrypt = require("bcrypt");
const { userService } = require('../services/userService');
const salt = 10;
const questionController = {
	createQuestion: async (req, res) => { 
		try {
			const { topic, content, subject, fileUrl } = req.body; 
			const userId = req.user.id; 
			const payload = { topic, content, user_id: userId, subject, fileUrl }; 
			const createQuestion = await questionService.createQuestion(payload); 
			return res.status(createQuestion.status).json({ message: createQuestion.message, data: createQuestion.data, }); 
		} catch (error) { console.log('Error:', error); 
			return res.status(500).json({ 
				message: 'An error occurred while creating the question', 
				error: error.message, });
		} 
	},

	// createQuestion: async (req, res, next) => {
	// 	try {
	// 		// const { error, value } = questionSchema.validate(req.body, {abortEarly: false});
	// 		// if (error) {
	// 		// 	console.log('ValidationError', error);
	// 		// 	return res.status(400).json({ message: error.details[0].message });
	// 		// }
	// 		const user_id = req.user.id;
	// 		console.log("user_id");
	// 		const { title, content, subject, file_url } = req.body;
	// 		const payload = { title, content, user_id, subject_id, file_url };
	// 		const createQuestion = await questionService.createQuestion(payload);

	// 		if (!createQuestion) {
	// 			return res.status(createQuestion.status).json({ message: (createQuestion.message) });
	// 		}
	// 		return res.status(createQuestion.status).json({
	// 			message: createQuestion.message,
	// 			data: createQuestion.data,
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 		return res.status(500).json({
	// 			message: 'An error occurred while creating the question',
	// 			error: error
	// 		});
	// 	}
	// },

	updateQuestion: async (req, res,) => {
		try {
			const id = req.params.id;
			const updateData = req.body;
			const question = await questionService.findOne(id, updateData);
			if (!question) {
				return res.status(404).json({ message: `Question with email: ${req.params.email} not found` });
			}
			const { first_name, last_name, phone_number } = req.body;
			if (first_name !== last_name) {
				await question.update(updateData);
				return res.status(question.status).json({
					message: (question.message),
					data: (question.data)
				});
			}
		} catch (error) {
			
		}
	},

	getAll: async (req, res) => {
		try {
			const payload = req.query;
			const questions = await questionService.allQuestions(payload);
			return res.status(questions.status).json({
				message: (questions.message),
				data: (questions.data)
			});
		} catch (error) {
			console.error("Error fetching questions:", error);
				return res.status(500).json({
					message: 'Internal Server Error',
					error: error
				});
		}
	},

	getOne: async (req, res) => {
		try {
			const result = await questionService.oneQuestion(req.params.id);
			// if (!result) {
			// 	return res.status(result.status).json({
			// 		message: result.message,
			// 		data: result.data
			// 	});
			// }
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
			const payload = req.params.id;
			const result = await questionService.deleteQuestion(payload);
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

module.exports = { questionController };
