const Stop = require('../models/Stop');
const Trip = require('../models/Trip');
const Activity = require('../models/Activity');

// Helper: verify the user owns the trip that owns the stop
const verifyStopOwnership = async (stopId, userId) => {
  const stop = await Stop.findById(stopId);
  if (!stop) return { error: 'Stop not found', status: 404 };

  const trip = await Trip.findOne({ _id: stop.trip, user: userId });
  if (!trip) return { error: 'Access denied', status: 403 };

  return { stop, trip };
};

// ─────────────────────────────────────────
// @desc    Get all stops for a trip
// @route   GET /api/stops/trip/:tripId
// @access  Private
// ─────────────────────────────────────────
const getStopsByTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const stops = await Stop.find({ trip: req.params.tripId }).sort({ orderIndex: 1 });

    res.status(200).json({
      success: true,
      message: 'Stops fetched successfully',
      data: { count: stops.length, stops },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Add a stop to a trip (flat route)
// @route   POST /api/stops
// @access  Private
// Body: { tripId, city, country, arrivalDate, departureDate, notes }
// ─────────────────────────────────────────
const addStop = async (req, res, next) => {
  try {
    const { tripId, city, country, arrivalDate, departureDate, notes } = req.body;

    if (!tripId || !city || !country) {
      return res.status(400).json({ success: false, message: 'tripId, city and country are required' });
    }

    const trip = await Trip.findOne({ _id: tripId, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    // Auto-assign orderIndex
    const lastStop = await Stop.findOne({ trip: tripId }).sort({ orderIndex: -1 });
    const orderIndex = lastStop ? lastStop.orderIndex + 1 : 0;

    const stop = await Stop.create({ trip: tripId, city, country, arrivalDate, departureDate, notes, orderIndex });

    res.status(201).json({
      success: true,
      message: 'Stop added successfully',
      data: { stop },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update a stop
// @route   PUT /api/stops/:id
// @access  Private
// ─────────────────────────────────────────
const updateStop = async (req, res, next) => {
  try {
    const { stop, error, status } = await verifyStopOwnership(req.params.id, req.user._id);
    if (error) return res.status(status).json({ success: false, message: error });

    const allowedFields = ['city', 'country', 'arrivalDate', 'departureDate', 'notes', 'orderIndex'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) stop[field] = req.body[field];
    });

    const updatedStop = await stop.save();

    res.status(200).json({
      success: true,
      message: 'Stop updated successfully',
      data: { stop: updatedStop },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete a stop and its activities
// @route   DELETE /api/stops/:id
// @access  Private
// ─────────────────────────────────────────
const deleteStop = async (req, res, next) => {
  try {
    const { stop, error, status } = await verifyStopOwnership(req.params.id, req.user._id);
    if (error) return res.status(status).json({ success: false, message: error });

    await Activity.deleteMany({ stop: stop._id });
    await stop.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Stop and its activities deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Reorder stops for a trip
// @route   PUT /api/stops/reorder
// @access  Private
// Body: { tripId, orderedIds: ["id1","id2",...] }
// ─────────────────────────────────────────
const reorderStops = async (req, res, next) => {
  try {
    const { tripId, orderedIds } = req.body;

    if (!tripId || !Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'tripId and orderedIds[] are required' });
    }

    const trip = await Trip.findOne({ _id: tripId, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    await Promise.all(
      orderedIds.map((id, index) =>
        Stop.findOneAndUpdate({ _id: id, trip: tripId }, { orderIndex: index })
      )
    );

    const stops = await Stop.find({ trip: tripId }).sort({ orderIndex: 1 });

    res.status(200).json({
      success: true,
      message: 'Stops reordered successfully',
      data: { stops },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStopsByTrip, addStop, updateStop, deleteStop, reorderStops };
