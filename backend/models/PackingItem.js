const mongoose = require('mongoose');

const packingItemSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    itemName: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      maxlength: [200, 'Item name cannot exceed 200 characters'],
    },
    category: {
      type: String,
      enum: [
        'clothing',
        'toiletries',
        'electronics',
        'documents',
        'medications',
        'accessories',
        'food',
        'entertainment',
        'other',
      ],
      default: 'other',
    },
    packedStatus: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, 'Quantity must be at least 1'],
    },
    notes: {
      type: String,
      maxlength: [300, 'Notes cannot exceed 300 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PackingItem', packingItemSchema);
