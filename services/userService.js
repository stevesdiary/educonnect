const { validateUser } = require("../middlewares/validate");
const { User } = require("../models");
const userController = require('../controllers/userController');
const userService = {
	createUser: async(payload) => {
		try {
			const emailExists = await User.findOne({
				where: {
					email: payload.email,
				}
			});
			if (emailExists) {
				const usernameExists = emailExists.username;
				if (usernameExists === payload.username) {
					return { 
						status: 400, 
						message: `User ${payload.username} already exists, login with this email and password` 
					};
				}
		}
			const createUser = await User.create(payload);
			const { createdAt, updatedAt, birthdate, password: _, ...userData } = createUser.dataValues;
			return { status: 201, message: "User record created!", data: userData };
		} catch (error) {
			console.log("Service error", error);
			throw error;
		}

	},

	getAll: async(req, res) => {
		try {
			const userRecord = await User.findAll({
				attributes: {
					exclude: ["createdAt", "updatedAt", "password"]
				}
			});
			return { status:200, message: 'User records found!', data: userRecord };
		} catch (error) {
			console.error("Error fetching users:", error);
				throw error;
		}
	},

	getOne: async(payload) => {
		try {
			const id = payload;
			const userRecord = await User.findOne({
				where: { id: payload },
				attributes: {
					exclude: ["createdAt", "updatedAt", "password"]
				}
			});
			if (!userRecord) {
				return { status: 404, message: 'User record not found' };
			}
			return { status:200, message: 'Record found!', data: userRecord };
		} catch (error) {
			throw error;
		}
	},

	update: async(user_id, payload) => {
		try {
			const user = await User.findOne({ 
				where: { id: user_id },
			});
			if (!user){
				console.log("Sorry, the user record id was not found");
				return res.status(404).json({ message: "Oops!, user not found." });
			}
			await user.update(updateData)
			const { password, ...updatedData } = user.toJSON();
			return res.status(200).json({ message: `${user.name}'s profile Updated succesffully`, data: updatedData });
		} catch (error) {
			throw error;
		}
	},

	deleteOne: async(payload) => {
		try {
			const id = payload;
			const deleteUser = await User.destroy({
				where: { id: payload }
			});
			if (deleteUser < 1) {
				console.log("User not found");
				return { status: 404, message: "User record was not found or already deleted" };
			}

			console.log("User deleted", deleteUser);
			return { status: 200, message: "Record deleted", data: deleteUser };
		
			return deleteUser;
		} catch (error) {
			throw error;
		}
	},

}

module.exports = { userService };
