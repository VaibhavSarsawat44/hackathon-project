/**
 * budgetCalculator.js
 * Reusable budget calculation utilities for Traveloop
 */

/**
 * Calculate the full budget breakdown for a trip.
 *
 * @param {Object} trip        - Mongoose Trip document
 * @param {Array}  activities  - Array of Activity documents for all stops in the trip
 * @returns {Object}           - Complete budget summary
 */
const calculateBudget = (trip, activities = []) => {
  // ── Auto-calculated from Activity collection ──────────────────────
  const activityExpenses = activities.reduce((sum, a) => sum + (a.cost || 0), 0);

  // ── Manual costs entered by user on the Trip ──────────────────────
  const transportCost = trip.transportCost || 0;
  const stayCost      = trip.stayCost      || 0;
  const mealCost      = trip.mealCost      || 0;

  // ── Totals ────────────────────────────────────────────────────────
  const totalManualCosts  = transportCost + stayCost + mealCost;
  const totalExpenses     = activityExpenses + totalManualCosts;
  const totalBudget       = trip.totalBudget || 0;
  const remainingBudget   = parseFloat((totalBudget - totalExpenses).toFixed(2));
  const budgetUsedPercent = totalBudget > 0
    ? parseFloat(((totalExpenses / totalBudget) * 100).toFixed(1))
    : 0;

  // ── Duration & Daily Average ──────────────────────────────────────
  let durationDays  = null;
  let dailyAverage  = null;

  if (trip.startDate && trip.endDate) {
    const diff = new Date(trip.endDate) - new Date(trip.startDate);
    durationDays = Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
    dailyAverage = parseFloat((totalExpenses / durationDays).toFixed(2));
  }

  return {
    totalBudget,
    breakdown: {
      activityCost:  parseFloat(activityExpenses.toFixed(2)),
      transportCost: parseFloat(transportCost.toFixed(2)),
      stayCost:      parseFloat(stayCost.toFixed(2)),
      mealCost:      parseFloat(mealCost.toFixed(2)),
    },
    totalExpenses:     parseFloat(totalExpenses.toFixed(2)),
    remainingBudget,
    budgetUsedPercent,
    dailyAverage,
    durationDays,
    isOverBudget: remainingBudget < 0,
  };
};

/**
 * Calculate expenses grouped by category across all activities.
 *
 * @param {Array} activities - Array of Activity documents
 * @returns {Object}         - { sightseeing: 150, food: 300, ... }
 */
const calculateExpensesByCategory = (activities = []) => {
  return activities.reduce((acc, activity) => {
    const cat = activity.category || 'other';
    acc[cat] = parseFloat(((acc[cat] || 0) + (activity.cost || 0)).toFixed(2));
    return acc;
  }, {});
};

/**
 * Calculate per-stop cost summaries.
 *
 * @param {Array} stops      - Array of Stop documents
 * @param {Array} activities - Array of Activity documents (all stops)
 * @returns {Array}          - [{ stopId, city, country, totalCost, activitiesCount }]
 */
const calculateExpensesByStop = (stops = [], activities = []) => {
  return stops.map((stop) => {
    const stopActivities = activities.filter(
      (a) => a.stop.toString() === stop._id.toString()
    );
    const totalCost = stopActivities.reduce((sum, a) => sum + (a.cost || 0), 0);
    return {
      stopId:          stop._id,
      city:            stop.city,
      country:         stop.country,
      totalCost:       parseFloat(totalCost.toFixed(2)),
      activitiesCount: stopActivities.length,
    };
  });
};

module.exports = { calculateBudget, calculateExpensesByCategory, calculateExpensesByStop };
