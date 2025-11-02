import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('preferences.favoriteDestinations', 'name location');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone } = req.body;

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: req.user._id } 
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phone },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/favorites/:destinationId
// @desc    Add destination to favorites
// @access  Private
router.post('/favorites/:destinationId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.preferences.favoriteDestinations.includes(req.params.destinationId)) {
      user.preferences.favoriteDestinations.push(req.params.destinationId);
      await user.save();
    }

    res.json({
      message: 'Destination added to favorites',
      favorites: user.preferences.favoriteDestinations
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/favorites/:destinationId
// @desc    Remove destination from favorites
// @access  Private
router.delete('/favorites/:destinationId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.preferences.favoriteDestinations = user.preferences.favoriteDestinations.filter(
      dest => dest.toString() !== req.params.destinationId
    );
    
    await user.save();

    res.json({
      message: 'Destination removed from favorites',
      favorites: user.preferences.favoriteDestinations
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/favorites
// @desc    Get user's favorite destinations
// @access  Private
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('preferences.favoriteDestinations', 'name location category images rating');

    res.json(user.preferences.favoriteDestinations);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/preferences
// @desc    Update user travel preferences
// @access  Private
router.put('/preferences', auth, [
  body('travelStyle').isIn(['budget', 'luxury', 'adventure', 'cultural', 'family'])
    .withMessage('Invalid travel style')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { travelStyle } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 'preferences.travelStyle': travelStyle },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;