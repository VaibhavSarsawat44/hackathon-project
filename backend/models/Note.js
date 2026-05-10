const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: [true, 'Trip reference is required'],
    },
    // Optional: note can be scoped to a specific stop
    stop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stop',
      default: null,
    },
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Note content is required'],
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
