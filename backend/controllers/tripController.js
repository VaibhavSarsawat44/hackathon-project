const Trip = require('../models/Trip');
const Stop = require('../models/Stop');
const PackingItem = require('../models/PackingItem');

// ─────────────────────────────────────────
// @desc    Get all trips for logged-in user
// @route   GET /api/trips
// @access  Private
// ─────────────────────────────────────────
const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get a single trip by ID
// @route   GET /api/trips/:id
// @access  Private
// ─────────────────────────────────────────
const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found or access denied',
      });
    }

    // Populate stops with their activities
    const stops = await Stop.find({ trip: trip._id }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      trip,
      stops,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
// ─────────────────────────────────────────
const createTrip = async (req, res, next) => {
  try {
    const { tripName, description, startDate, endDate, totalBudget, coverPhoto, isPublic, status } =
      req.body;

    const trip = await Trip.create({
      tripName,
      description,
      startDate,
      endDate,
      totalBudget,
      coverPhoto,
      isPublic,
      status,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      trip,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private
// ─────────────────────────────────────────
const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found or access denied',
      });
    }

    const allowedFields = [
      'tripName',
      'description',
      'startDate',
      'endDate',
      'totalBudget',
      'coverPhoto',
      'isPublic',
      'status',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) trip[field] = req.body[field];
    });

    const updatedTrip = await trip.save();

    res.status(200).json({
      success: true,
      message: 'Trip updated successfully',
      trip: updatedTrip,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete a trip (and its stops & packing items)
// @route   DELETE /api/trips/:id
// @access  Private
// ─────────────────────────────────────────
const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found or access denied',
      });
    }

    // Cascade delete stops and packing items
    await Stop.deleteMany({ trip: trip._id });
    await PackingItem.deleteMany({ trip: trip._id });
    await trip.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Trip and all related data deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTrips, getTripById, createTrip, updateTrip, deleteTrip };
