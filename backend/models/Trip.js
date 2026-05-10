const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
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
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    totalBudget: {
      type: Number,
      default: 0,
      min: [0, 'Budget cannot be negative'],
    },
    coverPhoto: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

// Virtual to get stops count
tripSchema.virtual('stops', {
  ref: 'Stop',
  localField: '_id',
  foreignField: 'trip',
});

// Virtual to compute trip duration in days
tripSchema.virtual('durationDays').get(function () {
  if (this.startDate && this.endDate) {
    const diff = this.endDate - this.startDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  return null;
});

module.exports = mongoose.model('Trip', tripSchema);
