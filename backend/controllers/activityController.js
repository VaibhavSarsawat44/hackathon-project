const Activity = require('../models/Activity');
const Stop = require('../models/Stop');
const Trip = require('../models/Trip');

// Helper: verify user owns the stop they're adding activity to
const verifyStopOwnership = async (stopId, userId) => {
  const stop = await Stop.findById(stopId);
  if (!stop) return { error: 'Stop not found', status: 404 };

  const trip = await Trip.findOne({ _id: stop.trip, user: userId });
  if (!trip) return { error: 'Access denied', status: 403 };

  return { stop, trip };
};

// ─────────────────────────────────────────
// @desc    Get all activities for a stop
// @route   GET /api/activities/:stopId
// @access  Private
// ─────────────────────────────────────────
const getActivitiesByStop = async (req, res, next) => {
  try {
    const { stop, error, status } = await verifyStopOwnership(req.params.stopId, req.user._id);
    if (error) return res.status(status).json({ success: false, message: error });

    const activities = await Activity.find({ stop: req.params.stopId }).sort({ createdAt: 1 });

    const totalCost = activities.reduce((sum, a) => sum + (a.cost || 0), 0);

    res.status(200).json({
      success: true,
      message: 'Activities fetched successfully',
      data: {
        city: stop.city,
        count: activities.length,
        totalCost: parseFloat(totalCost.toFixed(2)),
        activities,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Add an activity to a stop
// @route   POST /api/activities
// @access  Private
// Body: { stopId, activityName, category, cost, duration, description, image }
// ─────────────────────────────────────────
const addActivity = async (req, res, next) => {
  try {
    const { stopId, activityName, category, cost, duration, description, image } = req.body;

    if (!stopId || !activityName) {
      return res.status(400).json({ success: false, message: 'stopId and activityName are required' });
    }

    const { error, status } = await verifyStopOwnership(stopId, req.user._id);
    if (error) return res.status(status).json({ success: false, message: error });

    const activity = await Activity.create({
      stop: stopId,
      activityName,
      category,
      cost,
      duration,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'Activity added successfully',
      data: { activity },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update an activity
// @route   PUT /api/activities/:id
// @access  Private
// ─────────────────────────────────────────
const updateActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    // Verify ownership via stop → trip chain
    const { error, status } = await verifyStopOwnership(activity.stop, req.user._id);
    if (error) return res.status(status).json({ success: false, message: error });

    const allowedFields = ['activityName', 'category', 'cost', 'duration', 'description', 'image'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) activity[field] = req.body[field];
    });

    const updatedActivity = await activity.save();

    res.status(200).json({
      success: true,
      message: 'Activity updated successfully',
      data: { activity: updatedActivity },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete an activity
// @route   DELETE /api/activities/:id
// @access  Private
// ─────────────────────────────────────────
const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const { error, status } = await verifyStopOwnership(activity.stop, req.user._id);
    if (error) return res.status(status).json({ success: false, message: error });

    await activity.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Activity deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getActivitiesByStop, addActivity, updateActivity, deleteActivity };
