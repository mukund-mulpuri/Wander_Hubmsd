import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
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
  district: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Pilgrimage', 'Hill Station', 'Coastal', 'Historical', 'Natural', 'Cultural', 'Adventure']
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
  bestTimeToVisit: {
    type: String,
    default: 'October to March'
  },
  attractions: [{
    name: String,
    description: String
  }],
  activities: [String],
  entryFee: {
    indian: {
      type: Number,
      default: 0
    },
    foreign: {
      type: Number,
      default: 0
    }
  },
  timings: {
    open: String,
    close: String,
    note: String
  },
  howToReach: {
    byRoad: String,
    byRail: String,
    byAir: String
  },
  nearbyHotels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
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
  popularity: {
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
destinationSchema.index({ name: 1 });
destinationSchema.index({ category: 1 });
destinationSchema.index({ location: 1 });
destinationSchema.index({ rating: -1 });
destinationSchema.index({ popularity: -1 });

export default mongoose.model('Destination', destinationSchema);