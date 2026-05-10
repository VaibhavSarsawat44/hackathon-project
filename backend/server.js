const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const stopRoutes = require('./routes/stopRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const packingRoutes = require('./routes/packingRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── Health Check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🌍 Traveloop API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// Nested: /api/trips/:tripId/stops
app.use('/api/trips/:tripId/stops', stopRoutes);

// Nested: /api/trips/:tripId/budget
app.use('/api/trips/:tripId/budget', budgetRoutes);

// Nested: /api/trips/:tripId/packing
app.use('/api/trips/:tripId/packing', packingRoutes);

// ── Error Handling ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Traveloop API running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
