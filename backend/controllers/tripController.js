const Trip = require('../models/Trip');
const Stop = require('../models/Stop');
const Activity = require('../models/Activity');
const PackingItem = require('../models/PackingItem');
const Note = require('../models/Note');

// ─────────────────────────────────────────
// @desc    Get all trips for logged-in user
// @route   GET /api/trips
// @access  Private
// ─────────────────────────────────────────
const getTrips = async (req, res, next) => {
  try {
    const { search, status, sortBy, order } = req.query;

    const query = { user: req.user._id };

    // Search filter: matches tripName or description (regex, case-insensitive)
    if (search) {
      query.$or = [
        { tripName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Status filter
    if (status && status !== 'all') {
      query.status = status;
    }

    // Sorting options
    let sortOptions = {};
    if (sortBy) {
      const sortOrder = order === 'asc' ? 1 : -1;
      sortOptions[sortBy] = sortOrder;
    } else {
      sortOptions['createdAt'] = -1; // Default: newest first
    }

    const trips = await Trip.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      message: 'Trips fetched successfully',
      data: { count: trips.length, trips },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get single trip with full details
// @route   GET /api/trips/:id
// @access  Private
// ─────────────────────────────────────────
const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const stops = await Stop.find({ trip: trip._id }).sort({ orderIndex: 1 });

    res.status(200).json({
      success: true,
      message: 'Trip fetched successfully',
      data: { trip, stops },
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
    const {
      tripName, description, startDate, endDate,
      totalBudget, estimatedCost, transportCost, stayCost, mealCost,
      coverPhoto, isPublic, status,
    } = req.body;

    if (!tripName) {
      return res.status(400).json({ success: false, message: 'Trip name is required' });
    }

    const trip = await Trip.create({
      user: req.user._id,
      tripName, description, startDate, endDate,
      totalBudget, estimatedCost, transportCost, stayCost, mealCost,
      coverPhoto, isPublic, status,
    });

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: { trip },
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
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const allowedFields = [
      'tripName', 'description', 'startDate', 'endDate',
      'totalBudget', 'estimatedCost', 'transportCost', 'stayCost', 'mealCost', 'activityCost',
      'coverPhoto', 'isPublic', 'status',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) trip[field] = req.body[field];
    });

    const updatedTrip = await trip.save();

    res.status(200).json({
      success: true,
      message: 'Trip updated successfully',
      data: { trip: updatedTrip },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete a trip + all related data
// @route   DELETE /api/trips/:id
// @access  Private
// ─────────────────────────────────────────
const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    // Cascade: delete stops and their activities
    const stops = await Stop.find({ trip: trip._id });
    const stopIds = stops.map((s) => s._id);

    await Activity.deleteMany({ stop: { $in: stopIds } });
    await Stop.deleteMany({ trip: trip._id });
    await PackingItem.deleteMany({ trip: trip._id });
    await Note.deleteMany({ trip: trip._id });
    await trip.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Trip and all related data deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTrips, getTripById, createTrip, updateTrip, deleteTrip };
