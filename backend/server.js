const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Route imports
const authRoutes    = require('./routes/authRoutes');
const tripRoutes    = require('./routes/tripRoutes');
const stopRoutes    = require('./routes/stopRoutes');
const activityRoutes = require('./routes/activityRoutes');
const packingRoutes = require('./routes/packingRoutes');
const notesRoutes   = require('./routes/notesRoutes');
const publicRoutes  = require('./routes/publicRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// ── Core Middleware ─────────────────────────────────────────────────────────
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
    version: '2.0.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    routes: {
      auth:       '/api/auth',
      trips:      '/api/trips',
      stops:      '/api/stops',
      activities: '/api/activities',
      packing:    '/api/packing',
      notes:      '/api/notes',
      public:     '/api/public',
    },
  });
});

// ── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/auth',       authRoutes);
app.use('/api/trips',      tripRoutes);
app.use('/api/stops',      stopRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/packing',    packingRoutes);
app.use('/api/notes',      notesRoutes);
app.use('/api/public',     publicRoutes);   // No auth required

// ── Error Handling ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`\n🚀 Traveloop API v2.0 running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
