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
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
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

const verifyEmailSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
	registerSchema,
	loginSchema,
	verifyEmailSchema,
};

module.exports = {
	User,
	schemas,
};
