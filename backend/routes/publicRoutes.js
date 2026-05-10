const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const Stop = require('../models/Stop');
const Activity = require('../models/Activity');

// ─────────────────────────────────────────
// @desc    Get public itinerary (trip + stops + activities, no notes/budget)
// @route   GET /api/public/:tripId
// @access  Public (no auth required)
// ─────────────────────────────────────────
router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, isPublic: true })
      .populate('user', 'name profilePhoto');

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Public itinerary not found. The trip may be private or does not exist.',
      });
    }

    const stops = await Stop.find({ trip: trip._id }).sort({ orderIndex: 1 });
    const stopIds = stops.map((s) => s._id);
    const activities = await Activity.find({ stop: { $in: stopIds } });

    // Group activities by stopId
    const activitiesByStop = stops.map((stop) => ({
      ...stop.toJSON(),
      activities: activities.filter((a) => a.stop.toString() === stop._id.toString()),
    }));

    res.status(200).json({
      success: true,
      message: 'Public itinerary fetched successfully',
      data: {
        trip: {
          _id: trip._id,
          tripName: trip.tripName,
          description: trip.description,
          startDate: trip.startDate,
          endDate: trip.endDate,
          durationDays: trip.durationDays,
          coverPhoto: trip.coverPhoto,
          status: trip.status,
          author: trip.user,
          createdAt: trip.createdAt,
        },
        stops: activitiesByStop,
        summary: {
          stopsCount: stops.length,
          activitiesCount: activities.length,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
