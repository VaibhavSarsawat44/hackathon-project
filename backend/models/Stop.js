const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: [true, 'Trip reference is required'],
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
    // Renamed from 'order' → 'orderIndex' per new spec
    orderIndex: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: days spent at this stop
stopSchema.virtual('stayDays').get(function () {
  if (this.arrivalDate && this.departureDate) {
    const diff = this.departureDate - this.arrivalDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  return null;
});

module.exports = mongoose.model('Stop', stopSchema);
