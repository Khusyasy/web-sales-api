const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transactions');

router.get('/', transactionsController.get_transaction);
router.get('/income', transactionsController.income);
router.get('/count', transactionsController.count);

module.exports = router;
