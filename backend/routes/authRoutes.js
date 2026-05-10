const express = require('express');
const router = express.Router();
const {
  signup, login, getMe, updateProfile,
  addSavedDestination, removeSavedDestination, changePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/me/destinations', protect, addSavedDestination);
router.delete('/me/destinations/:index', protect, removeSavedDestination);

module.exports = router;
