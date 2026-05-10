const mongoose = require('mongoose');

// Sub-schema for Activity (embedded inside Stop)
const activitySchema = new mongoose.Schema(
  {
    activityName: {
      type: String,
      required: [true, 'Activity name is required'],
      trim: true,
      maxlength: [200, 'Activity name cannot exceed 200 characters'],
    },
    category: {
      type: String,
      enum: [
        'sightseeing',
        'food',
        'transport',
        'accommodation',
        'entertainment',
        'shopping',
        'adventure',
        'culture',
        'nature',
        'other',
      ],
      default: 'other',
    },
    cost: {
      type: Number,
      default: 0,
      min: [0, 'Cost cannot be negative'],
    },
    duration: {
      type: String, // e.g., "2 hours", "1 day"
      default: '',
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
  },
  { timestamps: true }
);

// Stop schema with embedded activities
const stopSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    arrivalDate: {
      type: Date,
    },
    departureDate: {
      type: Date,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    activities: [activitySchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: total cost of all activities in this stop
stopSchema.virtual('totalCost').get(function () {
  return this.activities.reduce((sum, act) => sum + (act.cost || 0), 0);
});

// Virtual: number of days at this stop
stopSchema.virtual('stayDays').get(function () {
  if (this.arrivalDate && this.departureDate) {
    const diff = this.departureDate - this.arrivalDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  return null;
});

module.exports = mongoose.model('Stop', stopSchema);
