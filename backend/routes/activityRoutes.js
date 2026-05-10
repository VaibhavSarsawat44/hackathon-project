const express = require('express');
const router = express.Router();
const { getActivitiesByStop, addActivity, updateActivity, deleteActivity } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// GET activities for a stop
router.get('/:stopId', getActivitiesByStop);

// Flat CRUD
router.post('/', addActivity);
router.route('/:id').put(updateActivity).delete(deleteActivity);

module.exports = router;
