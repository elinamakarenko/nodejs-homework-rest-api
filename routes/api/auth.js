const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.post(
	"/register",
	validateBody(schemas.registerSchema),
	ctrlWrapper(ctrl.register)
);

router.post(
	"/login",
	validateBody(schemas.loginSchema),
	ctrlWrapper(ctrl.login)
);

router.post(
	"/verify",
	validateBody(schemas.verifyEmailSchema),
	ctrlWrapper(ctrl.resendEmail)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
	"/avatars",
	authenticate,
	upload.single("avatar"),
	ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
