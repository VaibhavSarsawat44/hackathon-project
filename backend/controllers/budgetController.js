const Trip = require('../models/Trip');
const Stop = require('../models/Stop');

// ─────────────────────────────────────────
// @desc    Get full budget breakdown for a trip
// @route   GET /api/trips/:tripId/budget
// @access  Private
// ─────────────────────────────────────────
const getBudgetSummary = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, user: req.user._id });

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const stops = await Stop.find({ trip: trip._id });

    // ── Aggregate expenses ──────────────────────────────────────────
    let totalActivityExpenses = 0;
    const expensesByStop = [];
    const expensesByCategory = {};

    stops.forEach((stop) => {
      let stopTotal = 0;

      stop.activities.forEach((activity) => {
        const cost = activity.cost || 0;
        totalActivityExpenses += cost;
        stopTotal += cost;

        // Group by category
        if (!expensesByCategory[activity.category]) {
          expensesByCategory[activity.category] = 0;
        }
        expensesByCategory[activity.category] += cost;
      });

      expensesByStop.push({
        stopId: stop._id,
        city: stop.city,
        country: stop.country,
        totalCost: stopTotal,
        activitiesCount: stop.activities.length,
      });
    });

    // ── Duration calculation ────────────────────────────────────────
    let durationDays = null;
    let dailyAverage = null;

    if (trip.startDate && trip.endDate) {
      const diff = new Date(trip.endDate) - new Date(trip.startDate);
      durationDays = Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
      dailyAverage = parseFloat((totalActivityExpenses / durationDays).toFixed(2));
    }

    const remainingBudget = parseFloat(
      ((trip.totalBudget || 0) - totalActivityExpenses).toFixed(2)
    );

    const budgetUsedPercent =
      trip.totalBudget > 0
        ? parseFloat(((totalActivityExpenses / trip.totalBudget) * 100).toFixed(1))
        : 0;

    res.status(200).json({
      success: true,
      budget: {
        totalBudget: trip.totalBudget || 0,
        totalActivityExpenses: parseFloat(totalActivityExpenses.toFixed(2)),
        remainingBudget,
        budgetUsedPercent,
        dailyAverage,
        durationDays,
        expensesByStop,
        expensesByCategory,
        stopsCount: stops.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBudgetSummary };
