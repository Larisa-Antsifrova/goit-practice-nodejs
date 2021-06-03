const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers/users-controllers');

router.post('/register', Controllers.register);
router.post('/login', Controllers.login);
router.post('/logout', Controllers.logout);

module.exports = router;
