const PackingItem = require('../models/PackingItem');
const Trip = require('../models/Trip');

// Helper: verify trip ownership
const verifyTrip = async (tripId, userId) => {
  return await Trip.findOne({ _id: tripId, user: userId });
};

// ─────────────────────────────────────────
// @desc    Get all packing items for a trip
// @route   GET /api/trips/:tripId/packing
// @access  Private
// ─────────────────────────────────────────
const getPackingList = async (req, res, next) => {
  try {
    const trip = await verifyTrip(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const items = await PackingItem.find({ trip: req.params.tripId }).sort({ category: 1 });

    const totalItems = items.length;
    const packedItems = items.filter((i) => i.packedStatus).length;

    res.status(200).json({
      success: true,
      stats: {
        total: totalItems,
        packed: packedItems,
        unpacked: totalItems - packedItems,
        percentPacked: totalItems > 0 ? parseFloat(((packedItems / totalItems) * 100).toFixed(1)) : 0,
      },
      items,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Add a packing item
// @route   POST /api/trips/:tripId/packing
// @access  Private
// ─────────────────────────────────────────
const addPackingItem = async (req, res, next) => {
  try {
    const trip = await verifyTrip(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const { itemName, category, quantity, notes } = req.body;

    const item = await PackingItem.create({
      trip: req.params.tripId,
      itemName,
      category,
      quantity,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Item added to packing list',
      item,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update a packing item (mark packed/unpacked, edit fields)
// @route   PUT /api/trips/:tripId/packing/:itemId
// @access  Private
// ─────────────────────────────────────────
const updatePackingItem = async (req, res, next) => {
  try {
    const trip = await verifyTrip(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const item = await PackingItem.findOneAndUpdate(
      { _id: req.params.itemId, trip: req.params.tripId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: 'Packing item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Packing item updated',
      item,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Toggle packed status
// @route   PATCH /api/trips/:tripId/packing/:itemId/toggle
// @access  Private
// ─────────────────────────────────────────
const togglePackedStatus = async (req, res, next) => {
  try {
    const trip = await verifyTrip(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const item = await PackingItem.findOne({ _id: req.params.itemId, trip: req.params.tripId });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Packing item not found' });
    }

    item.packedStatus = !item.packedStatus;
    await item.save();

    res.status(200).json({
      success: true,
      message: `Item marked as ${item.packedStatus ? 'packed' : 'unpacked'}`,
      item,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete a packing item
// @route   DELETE /api/trips/:tripId/packing/:itemId
// @access  Private
// ─────────────────────────────────────────
const deletePackingItem = async (req, res, next) => {
  try {
    const trip = await verifyTrip(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const item = await PackingItem.findOneAndDelete({
      _id: req.params.itemId,
      trip: req.params.tripId,
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Packing item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Packing item deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPackingList,
  addPackingItem,
  updatePackingItem,
  togglePackedStatus,
  deletePackingItem,
};
