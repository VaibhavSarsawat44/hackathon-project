const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tripName: {
      type: String,
      required: [true, 'Trip name is required'],
      trim: true,
      maxlength: [200, 'Trip name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    startDate: { type: Date },
    endDate: { type: Date },

    // ── Budget Fields ──────────────────────────────────────────────
    // User-defined total budget
    totalBudget: {
      type: Number,
      default: 0,
      min: [0, 'Budget cannot be negative'],
    },
    // Manual cost breakdown inputs (set by user)
    estimatedCost: { type: Number, default: 0 },
    transportCost: { type: Number, default: 0 },
    stayCost:      { type: Number, default: 0 },
    mealCost:      { type: Number, default: 0 },
    // activityCost is auto-calculated from Activity collection
    // but can also be stored as a cached snapshot
    activityCost:  { type: Number, default: 0 },

    coverPhoto: {
      type: String,
      default: '',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['planning', 'upcoming', 'ongoing', 'completed'],
      default: 'planning',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: trip duration in days
tripSchema.virtual('durationDays').get(function () {
  if (this.startDate && this.endDate) {
    const diff = new Date(this.endDate) - new Date(this.startDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  return null;
});

module.exports = mongoose.model('Trip', tripSchema);
