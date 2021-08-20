const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.get_users);
router.get('/count', usersController.count);

router.post('/login', usersController.login);
router.post('/logout', usersController.logout);

module.exports = router;
