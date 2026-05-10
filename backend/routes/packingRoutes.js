const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getPackingList,
  addPackingItem,
  updatePackingItem,
  togglePackedStatus,
  deletePackingItem,
} = require('../controllers/packingController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getPackingList).post(addPackingItem);

router.route('/:itemId').put(updatePackingItem).delete(deletePackingItem);

router.patch('/:itemId/toggle', togglePackedStatus);

module.exports = router;
