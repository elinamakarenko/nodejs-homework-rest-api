const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");
const emailRegexp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: emailRegexp,
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: { type: String, required: true },
	},
	{ versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

const registerSchema = Joi.object({
	password: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	token: Joi.string(),
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().required(),
});

const schemas = {
	registerSchema,
	loginSchema,
};

module.exports = {
	User,
	schemas,
};
