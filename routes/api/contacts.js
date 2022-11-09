const express = require("express");

const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
	name: Joi.string()
		.pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
		.required(),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
		.required(),
});

router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.getContactById(id);
		if (!result) {
			throw RequestError(404, "Not found");
		}
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw RequestError(400, error.message);
		}
		const result = await contacts.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contacts.removeContact(contactId);
		if (!result) {
			throw RequestError(404, "Not found");
		}
		res.json({
			message: "Delete success",
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw RequestError(400, error.message);
		}
		const { contactId } = req.params;
		const result = await contacts.updateContact(contactId, req.body);
		if (!result) {
			throw RequestError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
