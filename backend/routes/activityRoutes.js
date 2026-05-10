const express = require('express');
const router = express.Router({ mergeParams: true }); // Access :tripId and :stopId from parent
const { getActivities, addActivity, updateActivity, removeActivity } = require('../controllers/activityController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getActivities).post(addActivity);

router.route('/:activityId').put(updateActivity).delete(removeActivity);

module.exports = router;
