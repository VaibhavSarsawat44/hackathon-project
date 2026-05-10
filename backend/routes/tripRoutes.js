const express = require('express');
const router = express.Router();
const { getTrips, getTripById, createTrip, updateTrip, deleteTrip } = require('../controllers/tripController');
const { getBudgetSummary } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getTrips).post(createTrip);
router.route('/:id').get(getTripById).put(updateTrip).delete(deleteTrip);
router.get('/:id/budget', getBudgetSummary);

module.exports = router;
