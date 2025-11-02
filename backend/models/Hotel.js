import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Budget', 'Mid-Range', 'Luxury', 'Resort', 'Heritage', 'Boutique']
  },
  starRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  images: [{
    url: String,
    caption: String
  }],
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  priceRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  amenities: [String],
  roomTypes: [{
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    amenities: [String],
    available: {
      type: Boolean,
      default: true
    }
  }],
  contact: {
    phone: String,
    email: String,
    website: String
  },
  checkInTime: {
    type: String,
    default: '14:00'
  },
  checkOutTime: {
    type: String,
    default: '12:00'
  },
  policies: {
    cancellation: String,
    children: String,
    pets: String
  },
  nearbyDestinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  }],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
hotelSchema.index({ name: 1 });
hotelSchema.index({ location: 1 });
hotelSchema.index({ category: 1 });
hotelSchema.index({ rating: -1 });
hotelSchema.index({ 'priceRange.min': 1 });

export default mongoose.model('Hotel', hotelSchema);