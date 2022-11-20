const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
	try {
		const { _id: owner } = req.user;
		const { page = 1, limit = 10 } = req.query;
		const skip = (page - 1) * limit;
		const result = await Contact.find({ owner }, "-createAt -updateAt", {
			skip,
			limit,
		}).populate("owner", "email");
		res.json(result);
	} catch (error) {
		next(error);
	}
};
module.exports = getAll;
