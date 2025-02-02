const express = require("express");
const { isValidId, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put("/:contactId", authenticate, isValidId, ctrl.updateContact);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidId,
	ctrl.updateFavorite
);

module.exports = router;
