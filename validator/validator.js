const Joi = require('joi')
const phoneRegex = /^(?:\+?234|0)\d{10}$/
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])/


const subjectSchema = Joi.object({
	name: Joi.string().required(),
});

const questionSchema = Joi.object({
	topic: Joi.string().required(),
	content: Joi.string().required(),
	user_id: Joi.string().required(),
	subject_id: Joi.number().required(),
	fileUrl: Joi.string().optional(),
	saved: Joi.boolean().optional(),
});

const answerSchema = Joi.object({
	content: Joi.string().required(),
	fileUrl: Joi.string().optional(),
});

const ratingSchema = Joi.object({
	value: Joi.number().required(),
	user_id: Joi.string().required(),
	answer_id: Joi.string().required()
});

const userBadgeSchema = Joi.object({
	user_id: Joi.string().required(),
	badge_id: Joi.number().required(),
	earned_at: Joi.date().required(),
});

const signUpSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required().pattern(passwordRegEx),
});

const messageSchema = Joi.object({
	content: Joi.string().required(),
})

const createUserSchema = Joi.object({
	name: Joi.string().min(3).required(),
	username: Joi.string().alphanum().min(3).required(true),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(35).pattern(new RegExp(passwordRegEx)).label('Password'),
	confirm_password: Joi.ref('password'),
	phone: Joi.string().regex(phoneRegex).optional(),
	profile_picture: Joi.string().uri().optional().allow(null, ''),
	gender: Joi.string().required(),
	birthdate: Joi.date().optional(),
	type: Joi.string().optional(),
	is_active: Joi.boolean().optional(),
});

const updateUserSchema = Joi.object({
	name: Joi.string().min(3).required(),
	username: Joi.string().alphanum().min(3).required(true),
	email: Joi.string().email().required(),
	phone_number: Joi.string().regex(phoneRegex).optional(),
	profile_picture: Joi.string().optional(),
	birthdate: Joi.date().optional(),
	type: Joi.string().optional(),
	is_active: Joi.boolean().optional(),
	subscribed: Joi.boolean().required(),
});

const resetPasswordSchema = Joi.object({
	old_password: Joi.string().min(8).max(35).pattern(new RegExp(passwordRegEx)).optional(),
	new_password: Joi.string().min(8).max(35).pattern(new RegExp(passwordRegEx)).required(),
	confirm_password: Joi.ref('new_password'),
});
const passwordResetSchema = Joi.object({
	email: Joi.string().email().required().messages({ 'string.email': 'A valid email is required.', 'any.required': 'Email is required.', }),
	password: Joi.string().min(6).required().messages({ 'string.min': 'Password must be at least 6 characters long.', 'any.required': 'Password is required.', }),
	confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match.', 'any.required': 'Confirm password is required.', }),
});
const createOrganizerSchema = Joi.object({
	first_name: Joi.string().min(3).required(),
	last_name: Joi.string().min(3),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(35).pattern(new RegExp(passwordRegEx)).label('Password'),
	confirm_password: Joi.ref('password'),
	phone_number: Joi.string().regex(phoneRegex).required(),
	profile_picture: Joi.string().optional(),
	gender: Joi.string().valid('male', 'female').required(),
	type: Joi.string().optional(),
});

const idSchema = Joi.object({
	id: Joi.number().required().label('id'),
})

const validate = (schema) => (payload) => {
	const { error } = schema.validate(payload);
	return error;
};


module.exports = { 
	signUpSchema,
	createUserSchema,
	updateUserSchema,
	resetPasswordSchema,
	questionSchema,
	ratingSchema,
	userBadgeSchema,
	validate,
	idSchema,
	messageSchema,
	answerSchema,
	subjectSchema 
};
