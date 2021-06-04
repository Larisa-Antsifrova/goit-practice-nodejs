const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers/users-controllers');
const guard = require('../../../helpers/guard');

router.post('/register', Controllers.register);
router.post('/login', Controllers.login);
router.post('/logout', guard, Controllers.logout);

module.exports = router;
