import express from 'express';
import { body, validationResult } from 'express-validator';
import Destination from '../models/Destination.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/destinations
// @desc    Get all destinations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      location,
      search,
      sort = 'name'
    } = req.query;

    // Build query
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'name':
        sortOption = { name: 1 };
        break;
      case 'popular':
        sortOption = { popularity: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      default:
        sortOption = { name: 1 };
    }

    const destinations = await Destination.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('reviews', 'rating comment user');

    const total = await Destination.countDocuments(query);

    res.json({
      destinations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/destinations/:id
// @desc    Get single destination
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate('reviews.user', 'name avatar');

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json(destination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/destinations/:id/review
// @desc    Add a review to destination
// @access  Private
router.post('/:id/review', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, comment } = req.body;
    
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Check if user already reviewed this destination
    const existingReview = destination.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this destination' });
    }

    // Add review
    const review = {
      user: req.user._id,
      rating,
      comment
    };

    destination.reviews.push(review);

    // Update average rating
    const totalRating = destination.reviews.reduce((acc, review) => acc + review.rating, 0);
    destination.rating = totalRating / destination.reviews.length;

    await destination.save();

    res.status(201).json({
      message: 'Review added successfully',
      review
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/destinations/categories
// @desc    Get all destination categories
// @access  Public
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Destination.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/destinations/popular
// @desc    Get popular destinations
// @access  Public
router.get('/meta/popular', async (req, res) => {
  try {
    const popularDestinations = await Destination.find()
      .sort({ popularity: -1, rating: -1 })
      .limit(6);

    res.json(popularDestinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;