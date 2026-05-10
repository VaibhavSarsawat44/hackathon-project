const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    stop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stop',
      required: [true, 'Stop reference is required'],
    },
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
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
