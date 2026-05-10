const express = require('express');
const router = express.Router();
const { getPackingList, addPackingItem, updatePackingItem, togglePackedStatus, deletePackingItem } = require('../controllers/packingController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// GET packing list for a trip
router.get('/:tripId', getPackingList);

// Flat CRUD
router.post('/', addPackingItem);
router.route('/:id').put(updatePackingItem).delete(deletePackingItem);
router.patch('/:id/toggle', togglePackedStatus);

module.exports = router;
