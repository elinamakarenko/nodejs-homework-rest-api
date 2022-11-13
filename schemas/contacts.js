const Joi = require("joi");

const addSchema = Joi.object({
	name: Joi.string()
		.pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
		.required(),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
		.required(),
});

module.exports = { addSchema };
