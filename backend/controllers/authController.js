const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// ─────────────────────────────────────────
// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
// ─────────────────────────────────────────
const signup = async (req, res, next) => {
  try {
    const { name, email, password, phone, city, country, additionalInfo } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const user = await User.create({ name, email, password, phone, city, country, additionalInfo });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePhoto: user.profilePhoto,
          savedDestinations: user.savedDestinations,
          bio: user.bio,
          phone: user.phone,
          city: user.city,
          country: user.country,
          additionalInfo: user.additionalInfo,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePhoto: user.profilePhoto,
          savedDestinations: user.savedDestinations,
          bio: user.bio,
          phone: user.phone,
          city: user.city,
          country: user.country,
          additionalInfo: user.additionalInfo,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
// ─────────────────────────────────────────
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
// ─────────────────────────────────────────
const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, profilePhoto, phone, city, country, additionalInfo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, profilePhoto, phone, city, country, additionalInfo },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Add a saved destination
// @route   POST /api/auth/me/destinations
// @access  Private
// ─────────────────────────────────────────
const addSavedDestination = async (req, res, next) => {
  try {
    const { city, country, image } = req.body;

    if (!city || !country) {
      return res.status(400).json({ success: false, message: 'City and country are required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { savedDestinations: { city, country, image: image || '' } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Destination saved',
      data: { savedDestinations: user.savedDestinations },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Remove a saved destination by index
// @route   DELETE /api/auth/me/destinations/:index
// @access  Private
// ─────────────────────────────────────────
const removeSavedDestination = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const index = parseInt(req.params.index);

    if (index < 0 || index >= user.savedDestinations.length) {
      return res.status(400).json({ success: false, message: 'Invalid destination index' });
    }

    user.savedDestinations.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Destination removed',
      data: { savedDestinations: user.savedDestinations },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
// ─────────────────────────────────────────
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      data: { token: generateToken(user._id) },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, getMe, updateProfile, addSavedDestination, removeSavedDestination, changePassword };
