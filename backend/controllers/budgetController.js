const Trip = require('../models/Trip');
const Stop = require('../models/Stop');
const Activity = require('../models/Activity');
const { calculateBudget, calculateExpensesByCategory, calculateExpensesByStop } = require('../utils/budgetCalculator');

// ─────────────────────────────────────────
// @desc    Get full budget breakdown for a trip
// @route   GET /api/trips/:id/budget
// @access  Private
// ─────────────────────────────────────────
const getBudgetSummary = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const stops = await Stop.find({ trip: trip._id }).sort({ orderIndex: 1 });
    const stopIds = stops.map((s) => s._id);
    const activities = await Activity.find({ stop: { $in: stopIds } });

    const summary = calculateBudget(trip, activities);
    const expensesByCategory = calculateExpensesByCategory(activities);
    const expensesByStop = calculateExpensesByStop(stops, activities);

    res.status(200).json({
      success: true,
      message: 'Budget summary fetched successfully',
      data: {
        ...summary,
        expensesByCategory,
        expensesByStop,
        stopsCount: stops.length,
        activitiesCount: activities.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBudgetSummary };
