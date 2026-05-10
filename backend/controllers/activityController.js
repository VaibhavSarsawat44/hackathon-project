const Stop = require('../models/Stop');
const Trip = require('../models/Trip');

// Helper: verify trip ownership and find stop
const findStop = async (tripId, stopId, userId) => {
  const trip = await Trip.findOne({ _id: tripId, user: userId });
  if (!trip) return { error: 'Trip not found or access denied', status: 404 };

  const stop = await Stop.findOne({ _id: stopId, trip: tripId });
  if (!stop) return { error: 'Stop not found', status: 404 };

  return { trip, stop };
};

// ─────────────────────────────────────────
// @desc    Get all activities for a stop
// @route   GET /api/trips/:tripId/stops/:stopId/activities
// @access  Private
// ─────────────────────────────────────────
const getActivities = async (req, res, next) => {
  try {
    const { stop, error, status } = await findStop(
      req.params.tripId,
      req.params.stopId,
      req.user._id
    );
    if (error) return res.status(status).json({ success: false, message: error });

    res.status(200).json({
      success: true,
      count: stop.activities.length,
      activities: stop.activities,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────
// @desc    Add an activity to a stop
// @route   POST /api/trips/:tripId/stops/:stopId/activities
// @access  Private
// ─────────────────────────────────────────
const addActivity = async (req, res, next) => {
  try {
    const { stop, error, status } = await findStop(
      req.params.tripId,
      req.params.stopId,
      req.user._id
    );
    if (error) return res.status(status).json({ success: false, message: error });

    const { activityName, category, cost, duration, description } = req.body;

    stop.activities.push({ activityName, category, cost, duration, description });
    await stop.save();

    const newActivity = stop.activities[stop.activities.length - 1];

    res.status(201).json({
      success: true,
      message: 'Activity added successfully',
      activity: newActivity,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────
// @desc    Update an activity
// @route   PUT /api/trips/:tripId/stops/:stopId/activities/:activityId
// @access  Private
// ─────────────────────────────────────────
const updateActivity = async (req, res, next) => {
  try {
    const { stop, error, status } = await findStop(
      req.params.tripId,
      req.params.stopId,
      req.user._id
    );
    if (error) return res.status(status).json({ success: false, message: error });

    const activity = stop.activities.id(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const { activityName, category, cost, duration, description } = req.body;

    if (activityName !== undefined) activity.activityName = activityName;
    if (category !== undefined) activity.category = category;
    if (cost !== undefined) activity.cost = cost;
    if (duration !== undefined) activity.duration = duration;
    if (description !== undefined) activity.description = description;

    await stop.save();

    res.status(200).json({
      success: true,
      message: 'Activity updated successfully',
      activity,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────
// @desc    Remove an activity from a stop
// @route   DELETE /api/trips/:tripId/stops/:stopId/activities/:activityId
// @access  Private
// ─────────────────────────────────────────
const removeActivity = async (req, res, next) => {
  try {
    const { stop, error, status } = await findStop(
      req.params.tripId,
      req.params.stopId,
      req.user._id
    );
    if (error) return res.status(status).json({ success: false, message: error });

    const activity = stop.activities.id(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    activity.deleteOne();
    await stop.save();

    res.status(200).json({
      success: true,
      message: 'Activity removed successfully',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getActivities, addActivity, updateActivity, removeActivity };
