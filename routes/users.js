const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.get_users);
router.get('/count', usersController.count);

router.post('/login', usersController.login);

module.exports = router;
