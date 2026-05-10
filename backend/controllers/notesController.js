const Note = require('../models/Note');
const Trip = require('../models/Trip');
const Stop = require('../models/Stop');

// Helper: verify user owns the trip
const verifyTrip = async (tripId, userId) => {
  return await Trip.findOne({ _id: tripId, user: userId });
};

// ─────────────────────────────────────────
// @desc    Get all notes for a trip
// @route   GET /api/notes/:tripId
// @access  Private
// Optional query: ?stopId=xxx  → filter by stop
// ─────────────────────────────────────────
const getNotesByTrip = async (req, res, next) => {
  try {
    const trip = await verifyTrip(req.params.tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    const filter = { trip: req.params.tripId };
    if (req.query.stopId) filter.stop = req.query.stopId;

    const notes = await Note.find(filter)
      .populate('stop', 'city country')
      .sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      data: { count: notes.length, notes },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Create a note/journal entry
// @route   POST /api/notes
// @access  Private
// Body: { tripId, stopId (optional), title, content }
// ─────────────────────────────────────────
const createNote = async (req, res, next) => {
  try {
    const { tripId, stopId, title, content } = req.body;

    if (!tripId || !title || !content) {
      return res.status(400).json({ success: false, message: 'tripId, title, and content are required' });
    }

    const trip = await verifyTrip(tripId, req.user._id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or access denied' });
    }

    // If stopId provided, verify it belongs to this trip
    if (stopId) {
      const stop = await Stop.findOne({ _id: stopId, trip: tripId });
      if (!stop) {
        return res.status(404).json({ success: false, message: 'Stop not found in this trip' });
      }
    }

    const note = await Note.create({
      trip: tripId,
      stop: stopId || null,
      title,
      content,
    });

    const populated = await note.populate('stop', 'city country');

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: { note: populated },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
// ─────────────────────────────────────────
const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    const trip = await verifyTrip(note.trip, req.user._id);
    if (!trip) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const { title, content, stopId } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (stopId !== undefined) note.stop = stopId || null;

    const updatedNote = await note.save();
    await updatedNote.populate('stop', 'city country');

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: { note: updatedNote },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
// ─────────────────────────────────────────
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    const trip = await verifyTrip(note.trip, req.user._id);
    if (!trip) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotesByTrip, createNote, updateNote, deleteNote };
