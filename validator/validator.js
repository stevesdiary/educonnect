const Joi = require('joi')
const phoneRegex = /^(?:\+?234|0)\d{10}$/
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])/
// const birthdateRegEx = 

const subjectSchema = Joi.object({
	name: Joi.string().required(),
});

const questionSchema = Joi.object({
	title: Joi.string().required(),
	content: Joi.string().required(),
	user_id: Joi.string().required(),
	subject_id: Joi.string().required(),
	image_url: Joi.string().optional(),
});

const answerSchema = Joi.object({
	content: Joi.string().required(),
	user_id: Joi.string().required(),
	question_id: Joi.string().required(),
	upvote: Joi.number().optional(),
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

const createUserSchema = Joi.object({
	name: Joi.string().min(3).required(),
	username: Joi.string().alphanum().min(3).required(true),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(35).pattern(new RegExp(passwordRegEx)).label('Password'),
	confirm_password: Joi.ref('password'),
	phone_number: Joi.string().regex(phoneRegex).optional(),
	profile_picture: Joi.string().optional(),
	gender: Joi.string().required(),
	birthdate: Joi.date().optional(),
	type: Joi.string().optional(),
	subscribed: Joi.boolean().required(),
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
	id: Joi.string().uuid({ version: 'uuidv4' }).required().label('id'),
})

const validate = (schema) => (payload) => {
	const { error } = schema.validate(payload);
	return error;
};


module.exports = { 
	createUserSchema,
	questionSchema,
	ratingSchema,
	userBadgeSchema,
	validate,
	idSchema,
	answerSchema,
	subjectSchema 
};
