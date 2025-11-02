import express from "express";
import TripBooking from "../models/TripBooking.js";
import Destination from "../models/Destination.js";
import Hotel from "../models/Hotel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @desc    Create a new trip booking
// @route   POST /api/trip-bookings
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { tripDetails, contactDetails, paymentMethod = "card" } = req.body;

    // Validate required fields
    if (
      !tripDetails.destination ||
      !tripDetails.startDate ||
      !tripDetails.endDate ||
      !tripDetails.travelers
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required trip details",
      });
    }

    // Calculate trip duration
    const startDate = new Date(tripDetails.startDate);
    const endDate = new Date(tripDetails.endDate);
    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    if (duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Find destination details
    let destinationDetails = null;
    if (tripDetails.destination) {
      destinationDetails = await Destination.findOne({
        $or: [
          { name: { $regex: tripDetails.destination, $options: "i" } },
          { location: { $regex: tripDetails.destination, $options: "i" } },
        ],
      });
    }

    // Generate sample itinerary based on destination and duration
    const itinerary = await generateItinerary(
      destinationDetails,
      duration,
      tripDetails
    );

    // Calculate pricing based on budget and travelers
    const totalAmount = calculateTripCost(tripDetails, duration, itinerary);

    // Create booking
    const booking = new TripBooking({
      user: req.user._id,
      tripDetails: {
        ...tripDetails,
        duration,
        destinationId: destinationDetails?._id,
      },
      itinerary,
      paymentDetails: {
        totalAmount,
        paidAmount: totalAmount, // For demo, mark as fully paid
        paymentMethod,
        paymentStatus: "completed",
        transactionId:
          "TXN" +
          Date.now() +
          Math.random().toString(36).substr(2, 6).toUpperCase(),
      },
      contactDetails: contactDetails || {
        primaryContact: {
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone || "",
        },
      },
      bookingStatus: "confirmed",
    });

    await booking.save();
    await booking.populate([
      "tripDetails.destinationId",
      "hotelBookings.hotel",
    ]);

    res.status(201).json({
      success: true,
      message: "Trip booked successfully!",
      data: {
        booking: booking.generateConfirmation(),
        bookingId: booking.bookingId,
        itinerary: booking.itinerary,
        paymentDetails: booking.paymentDetails,
      },
    });
  } catch (error) {
    console.error("Trip booking error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating trip booking",
      error: error.message,
    });
  }
});

// @desc    Get user's trip bookings
// @route   GET /api/trip-bookings
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const { status, limit = 10, page = 1 } = req.query;

    const query = { user: req.user._id };
    if (status) {
      query.bookingStatus = status;
    }

    const bookings = await TripBooking.find(query)
      .populate("tripDetails.destinationId", "name images location")
      .populate("hotelBookings.hotel", "name images location")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await TripBooking.countDocuments(query);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
});

// @desc    Get specific trip booking
// @route   GET /api/trip-bookings/:bookingId
// @access  Private
router.get("/:bookingId", auth, async (req, res) => {
  try {
    const booking = await TripBooking.findOne({
      bookingId: req.params.bookingId,
      user: req.user._id,
    }).populate([
      {
        path: "tripDetails.destinationId",
        select: "name images location attractions activities",
      },
      { path: "hotelBookings.hotel", select: "name images location amenities" },
    ]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      data: { booking },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
});

// @desc    Cancel trip booking
// @route   PUT /api/trip-bookings/:bookingId/cancel
// @access  Private
router.put("/:bookingId/cancel", auth, async (req, res) => {
  try {
    const booking = await TripBooking.findOne({
      bookingId: req.params.bookingId,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    booking.bookingStatus = "cancelled";
    booking.paymentDetails.paymentStatus = "refunded";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      data: { booking: booking.generateConfirmation() },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling booking",
      error: error.message,
    });
  }
});

// @desc    Add feedback to trip
// @route   POST /api/trip-bookings/:bookingId/feedback
// @access  Private
router.post("/:bookingId/feedback", auth, async (req, res) => {
  try {
    const { rating, comment, images } = req.body;

    const booking = await TripBooking.findOne({
      bookingId: req.params.bookingId,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.feedback = {
      rating,
      comment,
      images: images || [],
      submittedAt: new Date(),
    };

    await booking.save();

    res.json({
      success: true,
      message: "Feedback submitted successfully",
      data: { feedback: booking.feedback },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting feedback",
      error: error.message,
    });
  }
});

// Helper function to generate itinerary
async function generateItinerary(destination, duration, tripDetails) {
  const itinerary = [];
  const startDate = new Date(tripDetails.startDate);

  // Find nearby hotels
  const hotels = await Hotel.find({
    $or: [
      {
        location: {
          $regex: destination?.location || tripDetails.destination,
          $options: "i",
        },
      },
      {
        "address.city": {
          $regex: destination?.district || "Andhra Pradesh",
          $options: "i",
        },
      },
    ],
  }).limit(3);

  for (let day = 1; day <= duration; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day - 1);

    const dayItinerary = {
      day,
      date: currentDate,
      activities: generateDayActivities(
        destination,
        day,
        tripDetails.interests
      ),
      accommodation:
        day < duration
          ? {
              hotel: hotels[0]?._id,
              checkIn: currentDate,
              checkOut: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
              roomType: getRoomType(tripDetails.budget),
              cost: getAccommodationCost(tripDetails.budget),
            }
          : null,
      meals: generateMeals(tripDetails.budget),
      transportation:
        day === 1
          ? {
              mode: tripDetails.transportation || "private-car",
              from: "Starting Point",
              to: destination?.name || tripDetails.destination,
              cost: getTransportationCost(tripDetails.transportation, duration),
            }
          : null,
    };

    itinerary.push(dayItinerary);
  }

  return itinerary;
}

// Helper function to generate day activities
function generateDayActivities(destination, day, interests) {
  const baseActivities = destination?.attractions?.slice(0, 3) || [
    { name: "Sightseeing", description: "Explore local attractions" },
    { name: "Cultural Experience", description: "Local cultural activities" },
    { name: "Photography", description: "Capture beautiful moments" },
  ];

  return baseActivities.map((attraction, index) => ({
    time: ["09:00 AM", "02:00 PM", "05:00 PM"][index] || "10:00 AM",
    activity: attraction.name || attraction,
    location: destination?.name || "Local Area",
    description:
      attraction.description || `Enjoy ${attraction.name || attraction}`,
    cost: Math.floor(Math.random() * 500) + 200,
  }));
}

// Helper function to generate meals
function generateMeals(budget) {
  const mealCosts = {
    budget: { breakfast: 150, lunch: 300, dinner: 400 },
    "mid-range": { breakfast: 300, lunch: 600, dinner: 800 },
    luxury: { breakfast: 500, lunch: 1000, dinner: 1500 },
    premium: { breakfast: 800, lunch: 1500, dinner: 2500 },
  };

  const costs = mealCosts[budget] || mealCosts["mid-range"];

  return [
    { type: "Breakfast", location: "Hotel Restaurant", cost: costs.breakfast },
    { type: "Lunch", location: "Local Restaurant", cost: costs.lunch },
    { type: "Dinner", location: "Fine Dining", cost: costs.dinner },
  ];
}

// Helper functions for pricing
function getRoomType(budget) {
  const roomTypes = {
    budget: "Standard Room",
    "mid-range": "Deluxe Room",
    luxury: "Suite",
    premium: "Presidential Suite",
  };
  return roomTypes[budget] || "Deluxe Room";
}

function getAccommodationCost(budget) {
  const costs = {
    budget: 2000,
    "mid-range": 4000,
    luxury: 8000,
    premium: 15000,
  };
  return costs[budget] || 4000;
}

function getTransportationCost(mode, duration) {
  const baseCosts = {
    public: 500,
    "private-car": 2000,
    "self-drive": 1500,
    "guided-tour": 3000,
  };
  return (baseCosts[mode] || 2000) * duration;
}

function calculateTripCost(tripDetails, duration, itinerary) {
  let total = 0;

  // Base cost per person per day
  const baseCosts = {
    budget: 2000,
    "mid-range": 4000,
    luxury: 8000,
    premium: 15000,
  };

  const basePerDay = baseCosts[tripDetails.budget] || 4000;
  total = basePerDay * duration * tripDetails.travelers;

  // Add activity costs
  itinerary.forEach((day) => {
    day.activities.forEach((activity) => {
      total += (activity.cost || 0) * tripDetails.travelers;
    });
    day.meals.forEach((meal) => {
      total += (meal.cost || 0) * tripDetails.travelers;
    });
    if (day.transportation) {
      total += day.transportation.cost || 0;
    }
  });

  return Math.round(total);
}

export default router;
