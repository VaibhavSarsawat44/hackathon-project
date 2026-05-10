const Stop = require('../models/Stop');
const Trip = require('../models/Trip');

// Helper: verify trip ownership
const verifyTripOwnership = async (tripId, userId) => {
  const trip = await Trip.findOne({ _id: tripId, user: userId });
  return trip;
};

// ─────────────────────────────────────────
// @desc    Get all stops for a trip
// @route   GET /api/trips/:tripId/stops
// @access  Private
// ─────────────────────────────────────────
const getStops = async (req, res, next) => {
  try {
    const trip = await verifyTripOwnership(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const stops = await Stop.find({ trip: req.params.tripId }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: stops.length,
      stops,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get single stop by ID
// @route   GET /api/trips/:tripId/stops/:stopId
// @access  Private
// ─────────────────────────────────────────
const getStopById = async (req, res, next) => {
  try {
    const trip = await verifyTripOwnership(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const stop = await Stop.findOne({ _id: req.params.stopId, trip: req.params.tripId });
    if (!stop) {
      return res.status(404).json({ success: false, message: 'Stop not found' });
    }

    res.status(200).json({ success: true, stop });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Add a stop to a trip
// @route   POST /api/trips/:tripId/stops
// @access  Private
// ─────────────────────────────────────────
const addStop = async (req, res, next) => {
  try {
    const trip = await verifyTripOwnership(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const { city, country, arrivalDate, departureDate, notes } = req.body;

    // Determine next order value
    const lastStop = await Stop.findOne({ trip: req.params.tripId }).sort({ order: -1 });
    const order = lastStop ? lastStop.order + 1 : 0;

    const stop = await Stop.create({
      trip: req.params.tripId,
      city,
      country,
      arrivalDate,
      departureDate,
      notes,
      order,
    });

    res.status(201).json({
      success: true,
      message: 'Stop added successfully',
      stop,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update a stop
// @route   PUT /api/trips/:tripId/stops/:stopId
// @access  Private
// ─────────────────────────────────────────
const updateStop = async (req, res, next) => {
  try {
    const trip = await verifyTripOwnership(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const stop = await Stop.findOne({ _id: req.params.stopId, trip: req.params.tripId });
    if (!stop) {
      return res.status(404).json({ success: false, message: 'Stop not found' });
    }

    const allowedFields = ['city', 'country', 'arrivalDate', 'departureDate', 'notes'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) stop[field] = req.body[field];
    });

    const updatedStop = await stop.save();

    res.status(200).json({
      success: true,
      message: 'Stop updated successfully',
      stop: updatedStop,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete a stop
// @route   DELETE /api/trips/:tripId/stops/:stopId
// @access  Private
// ─────────────────────────────────────────
const deleteStop = async (req, res, next) => {
  try {
    const trip = await verifyTripOwnership(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const stop = await Stop.findOneAndDelete({ _id: req.params.stopId, trip: req.params.tripId });
    if (!stop) {
      return res.status(404).json({ success: false, message: 'Stop not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Stop deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Reorder stops within a trip
// @route   PUT /api/trips/:tripId/stops/reorder
// @access  Private
// Body: { orderedIds: ["stopId1", "stopId2", ...] }
// ─────────────────────────────────────────
const reorderStops = async (req, res, next) => {
  try {
    const trip = await verifyTripOwnership(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const { orderedIds } = req.body;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'orderedIds must be a non-empty array of stop IDs',
      });
    }

    // Update each stop's order based on its position in the array
    const updatePromises = orderedIds.map((id, index) =>
      Stop.findOneAndUpdate({ _id: id, trip: req.params.tripId }, { order: index }, { new: true })
    );

    await Promise.all(updatePromises);

    const stops = await Stop.find({ trip: req.params.tripId }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      message: 'Stops reordered successfully',
      stops,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStops, getStopById, addStop, updateStop, deleteStop, reorderStops };
