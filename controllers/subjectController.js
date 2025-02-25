const { User, Subject } = require('../models');
const { Op } = require('sequelize');
const  subjectService  = require('../services/subjectService.js');
const subjectSchema  = require("../validator/validator");
// const validate 
const bcrypt = require("bcrypt");
const { userService } = require('../services/userService');
const salt = 10;
const subjectController = {
	createSubject: async (req, res) => { 
		try {
			const { error, value } = subjectSchema.validate(req.body, {abortEarly: false });
			if (error) {
				console.log("Validation Error", error);
				return res.status(400).json({ message: error.details}); //[0].message
			}
			const { name } = req.body; 
			const userId = req.user.id;
			const payload = { name }; 
			const createSubject = await subjectService.createSubject(payload); 
			if (createSubject.status !== 200) { 
				return res.status(createSubject.status).json({ message: createSubject.message }); 
			} 
			return res.status(createSubject.status).json({ message: createSubject.message, data: createSubject.data, }); 
		} catch (error) { console.log('Error:', error); 
			return res.status(500).json({ 
				message: 'An error occurred while creating the subject', 
				error: error.message, });
		} 
	},

	updateSubject: async (req, res,) => {
		try {
			const id = req.params.id;
			const updateData = req.body;
			const subject = await subjectService.findOne(id, updateData);
			if (!subject) {
				return res.status(404).json({ message: `Subject with email: ${req.params.email} not found` });
			}
			const { first_name, last_name, phone_number } = req.body;
			if (first_name !== last_name) {
				await subject.update(updateData);
				return res.status(subject.status).json({
					message: (subject.message),
					data: (subject.data)
				});
			}
		} catch (error) {
			return res.status(500).json({ message: "Error ocurred", error });
		}
	},

	getAll: async (req, res) => {
		try {
			const subjects = await subjectService.findAll();
			return res.status(subjects.status).json({
				message: (subjects.message),
				data: (subjects.data)
			});
		} catch (error) {
			console.error("Error fetching subjects:", error);
				return res.status(500).json({
					message: 'Internal Server Error',
					error: error
				});
		}
	},

	getOne: async (req, res) => {
		try {
			const payload = req.params
			const result = await subjectService.findOne(payload);
			if (!result) {
				return res.status(result.status).json({
					message: result.message,
				});
			}
			return res.status(result.status).json({
				message: result.message,
				data: result.data
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
			const payload = req.params;
			const result = await subjectService.delete(payload);
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

module.exports = { subjectController };
