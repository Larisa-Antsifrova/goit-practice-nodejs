const express = require("express");
const router = express.Router();
const Controllers = require("../../../controllers/users-controllers");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.post("/register", Controllers.register);
router.post("/login", Controllers.login);
router.post("/logout", guard, Controllers.logout);
router.patch("/avatars", guard, upload.single("avatar"), Controllers.avatars);

router.get("/verify/:token", Controllers.verify);
router.post("/verify", Controllers.repeatVerification);

module.exports = router;
