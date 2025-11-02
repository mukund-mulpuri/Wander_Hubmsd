import mongoose from 'mongoose';

const generateBookingId = () =>
  'TRB' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();

const tripBookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      default: generateBookingId,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tripDetails: {
      destination: { type: String, required: true },
      destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      duration: { type: Number, required: true }, // in days
      travelers: { type: Number, required: true, min: 1 },
      budget: {
        type: String,
        enum: ['budget', 'mid-range', 'luxury', 'premium'],
        required: true,
      },
      interests: [String],
      accommodation: {
        type: String,
        enum: ['budget', 'mid-range', 'luxury', 'resort', 'heritage'],
      },
      transportation: {
        type: String,
        enum: ['public', 'private-car', 'self-drive', 'guided-tour'],
      },
      specialRequests: String,
    },
    itinerary: [
      {
        day: Number,
        date: Date,
        activities: [
          {
            time: String,
            activity: String,
            location: String,
            description: String,
            cost: { type: Number, default: 0 },
          },
        ],
        accommodation: {
          hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
          checkIn: Date,
          checkOut: Date,
          roomType: String,
          cost: { type: Number, default: 0 },
        },
        meals: [
          {
            type: { type: String },
            location: String,
            cost: { type: Number, default: 0 },
          },
        ],
        transportation: {
          mode: String,
          from: String,
          to: String,
          cost: { type: Number, default: 0 },
        },
      },
    ],
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'paid', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    paymentDetails: {
      totalAmount: { type: Number, required: true },
      paidAmount: { type: Number, default: 0 },
      paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'wallet', 'cash'],
        default: 'card',
      },
      transactionId: String,
      paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'completed',
      },
      paymentDate: { type: Date, default: Date.now },
    },
    contactDetails: {
      primaryContact: {
        name: String,
        phone: String,
        email: String,
      },
      emergencyContact: {
        name: String,
        phone: String,
        relation: String,
      },
    },
    travelDocuments: [
      {
        type: { type: String },
        documentNumber: String,
        expiryDate: Date,
      },
    ],
    hotelBookings: [
      {
        hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
        checkIn: Date,
        checkOut: Date,
        rooms: [
          {
            type: String,
            count: { type: Number, default: 1 },
            pricePerNight: { type: Number, default: 0 },
          },
        ],
        totalCost: { type: Number, default: 0 },
        bookingConfirmation: String,
      },
    ],
    notes: {
      customerNotes: String,
      adminNotes: String,
      guideInstructions: String,
    },
    assignedGuide: {
      name: String,
      phone: String,
      email: String,
      languages: [String],
      experience: Number,
    },
    feedback: {
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      images: [String],
      submittedAt: Date,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
tripBookingSchema.index({ bookingId: 1 });
tripBookingSchema.index({ user: 1 });
tripBookingSchema.index({ 'tripDetails.startDate': 1 });
tripBookingSchema.index({ bookingStatus: 1 });
tripBookingSchema.index({ 'paymentDetails.paymentStatus': 1 });

// Virtual for trip duration in days
tripBookingSchema.virtual('tripDuration').get(function () {
  if (this.tripDetails?.startDate && this.tripDetails?.endDate) {
    const diffTime = Math.abs(this.tripDetails.endDate - this.tripDetails.startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Method to calculate total cost
tripBookingSchema.methods.calculateTotalCost = function () {
  let total = 0;

  if (Array.isArray(this.itinerary)) {
    this.itinerary.forEach((day) => {
      if (Array.isArray(day.activities))
        day.activities.forEach((activity) => (total += activity.cost || 0));

      if (day.accommodation?.cost) total += day.accommodation.cost;

      if (Array.isArray(day.meals))
        day.meals.forEach((meal) => (total += meal.cost || 0));

      if (day.transportation?.cost) total += day.transportation.cost;
    });
  }

  if (Array.isArray(this.hotelBookings)) {
    this.hotelBookings.forEach((booking) => {
      total += booking.totalCost || 0;
    });
  }

  return total;
};

// Method to generate booking confirmation
tripBookingSchema.methods.generateConfirmation = function () {
  return {
    bookingId: this.bookingId,
    status: this.bookingStatus,
    totalAmount: this.paymentDetails?.totalAmount || 0,
    paymentStatus: this.paymentDetails?.paymentStatus || 'pending',
    tripSummary: {
      destination: this.tripDetails?.destination,
      dates:
        this.tripDetails?.startDate && this.tripDetails?.endDate
          ? `${this.tripDetails.startDate.toDateString()} to ${this.tripDetails.endDate.toDateString()}`
          : 'N/A',
      travelers: this.tripDetails?.travelers,
      duration: this.tripDuration,
    },
  };
};

export default mongoose.model('TripBooking', tripBookingSchema);
