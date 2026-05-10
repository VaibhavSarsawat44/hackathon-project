const express = require('express');
const router = express.Router();
const { getStopsByTrip, addStop, updateStop, deleteStop, reorderStops } = require('../controllers/stopController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// GET all stops for a trip
router.get('/trip/:tripId', getStopsByTrip);

// Reorder (must be before /:id to avoid conflict)
router.put('/reorder', reorderStops);

// Flat CRUD
router.post('/', addStop);
router.route('/:id').put(updateStop).delete(deleteStop);

module.exports = router;
