const express = require('express');
const router = express.Router();
const { getNotesByTrip, createNote, updateNote, deleteNote } = require('../controllers/notesController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// GET notes for a trip (optional ?stopId= query filter)
router.get('/:tripId', getNotesByTrip);

// Flat CRUD
router.post('/', createNote);
router.route('/:id').put(updateNote).delete(deleteNote);

module.exports = router;
