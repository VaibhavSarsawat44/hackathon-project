const express = require('express');
// mergeParams: true allows access to :tripId from the parent router
const router = express.Router({ mergeParams: true });
const { getStops, getStopById, addStop, updateStop, deleteStop, reorderStops } = require('../controllers/stopController');
const { protect } = require('../middleware/auth');

// Import activity routes for nesting
const activityRouter = require('./activityRoutes');

// All stop routes require authentication
router.use(protect);

// Reorder must be before /:stopId to avoid conflict
router.put('/reorder', reorderStops);

router.route('/').get(getStops).post(addStop);

router.route('/:stopId').get(getStopById).put(updateStop).delete(deleteStop);

// Nest activity routes under stops
router.use('/:stopId/activities', activityRouter);

module.exports = router;
