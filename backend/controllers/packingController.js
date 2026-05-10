const PackingItem = require('../models/PackingItem');
const Trip = require('../models/Trip');

// Helper: verify trip ownership
const verifyTrip = async (tripId, userId) => {
  const trip = await Trip.findOne({ _id: tripId, user: userId });
  return trip;
};

// ─────────────────────────────────────────
// @desc    Get packing list for a trip
// @route   GET /api/packing/:tripId
// @access  Private
// ─────────────────────────────────────────
const getPackingList = async (req, res, next) => {
  try {
    const trip = await verifyTrip(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const items = await PackingItem.find({ trip: req.params.tripId }).sort({ category: 1 });

    const total = items.length;
    const packed = items.filter((i) => i.packedStatus).length;

    res.status(200).json({
      success: true,
      message: 'Packing list fetched successfully',
      data: {
        stats: {
          total,
          packed,
          unpacked: total - packed,
          percentPacked: total > 0 ? parseFloat(((packed / total) * 100).toFixed(1)) : 0,
        },
        items,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Add a packing item (flat route)
// @route   POST /api/packing
// @access  Private
// Body: { tripId, itemName, category, quantity, notes }
// ─────────────────────────────────────────
const addPackingItem = async (req, res, next) => {
  try {
    const { tripId, itemName, category, quantity, notes } = req.body;

    if (!tripId || !itemName) {
      return res.status(400).json({ success: false, message: 'tripId and itemName are required' });
    }

    const trip = await verifyTrip(tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const item = await PackingItem.create({ trip: tripId, itemName, category, quantity, notes });

    res.status(201).json({
      success: true,
      message: 'Item added to packing list',
      data: { item },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update a packing item
// @route   PUT /api/packing/:id
// @access  Private
// ─────────────────────────────────────────
const updatePackingItem = async (req, res, next) => {
  try {
    const packingItem = await PackingItem.findById(req.params.id);
    if (!packingItem) {
      return res.status(404).json({ success: false, message: 'Packing item not found' });
    }

    const trip = await verifyTrip(packingItem.trip, req.user._id);
    if (!trip) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const item = await PackingItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Packing item updated',
      data: { item },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Toggle packed status
// @route   PATCH /api/packing/:id/toggle
// @access  Private
// ─────────────────────────────────────────
const togglePackedStatus = async (req, res, next) => {
  try {
    const packingItem = await PackingItem.findById(req.params.id);
    if (!packingItem) {
      return res.status(404).json({ success: false, message: 'Packing item not found' });
    }

    const trip = await verifyTrip(packingItem.trip, req.user._id);
    if (!trip) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    packingItem.packedStatus = !packingItem.packedStatus;
    await packingItem.save();

    res.status(200).json({
      success: true,
      message: `Item marked as ${packingItem.packedStatus ? 'packed' : 'unpacked'}`,
      data: { item: packingItem },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete a packing item
// @route   DELETE /api/packing/:id
// @access  Private
// ─────────────────────────────────────────
const deletePackingItem = async (req, res, next) => {
  try {
    const packingItem = await PackingItem.findById(req.params.id);
    if (!packingItem) {
      return res.status(404).json({ success: false, message: 'Packing item not found' });
    }

    const trip = await verifyTrip(packingItem.trip, req.user._id);
    if (!trip) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await packingItem.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Packing item deleted',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPackingList, addPackingItem, updatePackingItem, togglePackedStatus, deletePackingItem };
