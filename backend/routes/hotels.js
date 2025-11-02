import express from 'express';
import { body, validationResult } from 'express-validator';
import Hotel from '../models/Hotel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/hotels
// @desc    Get all hotels
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      location,
      category,
      minPrice,
      maxPrice,
      rating,
      search,
      sort = 'name'
    } = req.query;

    // Build query
    let query = { isActive: true };
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.priceRange = {};
      if (minPrice) query.priceRange.$gte = parseInt(minPrice);
      if (maxPrice) query.priceRange.$lte = parseInt(maxPrice);
    }
    
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
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
      case 'price-low':
        sortOption = { 'priceRange.min': 1 };
        break;
      case 'price-high':
        sortOption = { 'priceRange.max': -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'name':
      default:
        sortOption = { name: 1 };
    }

    const hotels = await Hotel.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('nearbyDestinations', 'name location');

    const total = await Hotel.countDocuments(query);

    res.json({
      hotels,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/hotels/:id
// @desc    Get single hotel
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate('nearbyDestinations', 'name location')
      .populate('reviews.user', 'name avatar');

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/hotels/:id/review
// @desc    Add a review to hotel
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
    
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Check if user already reviewed this hotel
    const existingReview = hotel.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this hotel' });
    }

    // Add review
    const review = {
      user: req.user._id,
      rating,
      comment
    };

    hotel.reviews.push(review);

    // Update average rating
    const totalRating = hotel.reviews.reduce((acc, review) => acc + review.rating, 0);
    hotel.rating = totalRating / hotel.reviews.length;

    await hotel.save();

    res.status(201).json({
      message: 'Review added successfully',
      review
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/hotels/categories
// @desc    Get all hotel categories
// @access  Public
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Hotel.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/hotels/by-destination/:destinationId
// @desc    Get hotels near a destination
// @access  Public
router.get('/by-destination/:destinationId', async (req, res) => {
  try {
    const hotels = await Hotel.find({
      nearbyDestinations: req.params.destinationId,
      isActive: true
    }).sort({ rating: -1 });

    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;