const express = require('express');
const router = express.Router({ mergeParams: true });
const { getBudgetSummary } = require('../controllers/budgetController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getBudgetSummary);

module.exports = router;
