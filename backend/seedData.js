import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from './models/Destination.js';
import Hotel from './models/Hotel.js';

dotenv.config();

// Helper function to generate slug
const generateSlug = (name) => {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
};

// Comprehensive Andhra Pradesh Tourist Destinations
const destinations = [
  // Pilgrimage Sites
  {
    name: "Tirumala Venkateswara Temple",
    description: "One of the most sacred Hindu temples dedicated to Lord Venkateswara, attracting millions of devotees annually. The temple is renowned for its spiritual significance and architectural beauty.",
    location: "Tirumala, Tirupati",
    district: "Chittoor",
    category: "Pilgrimage",
    images: [
      {
        url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800",
        caption: "Tirumala Temple Main Entrance"
      },
      {
        url: "https://images.unsplash.com/photo-1609773517388-d8c2b2f5a2c5?w=800",
        caption: "Temple Architecture"
      }
    ],
    coordinates: { latitude: 13.6833, longitude: 79.3167 },
    bestTimeToVisit: "October to March",
    attractions: [
      { name: "Main Temple", description: "Sacred shrine of Lord Venkateswara" },
      { name: "Akasa Ganga Waterfall", description: "Sacred waterfall near the temple" },
      { name: "Sila Thoranam", description: "Natural rock formation" }
    ],
    activities: ["Darshan", "Spiritual meditation", "Temple tour", "Laddu prasadam"],
    entryFee: { indian: 0, foreign: 0 },
    timings: { open: "02:30 AM", close: "01:00 AM", note: "24 hours with breaks" },
    howToReach: {
      byRoad: "Well connected by roads from major cities",
      byRail: "Tirupati Railway Station (22 km)",
      byAir: "Tirupati Airport (15 km)"
    },
    rating: 4.8,
    popularity: 95
  },
  {
    name: "Srisailam Mallikarjuna Temple",
    description: "One of the 12 Jyotirlingas, this ancient temple is dedicated to Lord Shiva and is situated on the banks of River Krishna in the Nallamala Hills.",
    location: "Srisailam",
    district: "Kurnool",
    category: "Pilgrimage",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582132738033-6e0c3a0a5e6b?w=800",
        caption: "Srisailam Temple"
      }
    ],
    coordinates: { latitude: 16.0738, longitude: 78.8682 },
    bestTimeToVisit: "October to March",
    attractions: [
      { name: "Mallikarjuna Temple", description: "Sacred Jyotirlinga shrine" },
      { name: "Bhramaramba Temple", description: "Shakti Peetha temple" },
      { name: "Srisailam Dam", description: "Hydroelectric project on Krishna river" }
    ],
    activities: ["Temple darshan", "River boating", "Wildlife sanctuary visit"],
    entryFee: { indian: 0, foreign: 0 },
    timings: { open: "04:00 AM", close: "10:00 PM" },
    howToReach: {
      byRoad: "Connected by state highways",
      byRail: "Markapur Road Railway Station (84 km)",
      byAir: "Hyderabad Airport (213 km)"
    },
    rating: 4.6,
    popularity: 85
  },

  // Hill Stations
  {
    name: "Araku Valley",
    description: "A picturesque hill station nestled in the Eastern Ghats, famous for its coffee plantations, tribal culture, and scenic beauty.",
    location: "Araku Valley",
    district: "Visakhapatnam",
    category: "Hill Station",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        caption: "Araku Valley Landscape"
      },
      {
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        caption: "Coffee Plantations"
      }
    ],
    coordinates: { latitude: 18.3273, longitude: 82.8739 },
    bestTimeToVisit: "October to March",
    attractions: [
      { name: "Borra Caves", description: "Stunning limestone caves" },
      { name: "Coffee Museum", description: "Learn about coffee cultivation" },
      { name: "Tribal Museum", description: "Local tribal culture and artifacts" },
      { name: "Katiki Waterfalls", description: "Beautiful seasonal waterfall" }
    ],
    activities: ["Trekking", "Coffee plantation tours", "Tribal village visits", "Photography"],
    entryFee: { indian: 25, foreign: 100 },
    timings: { open: "06:00 AM", close: "06:00 PM" },
    howToReach: {
      byRoad: "Via Vizag-Araku highway",
      byRail: "Special tourist train from Visakhapatnam",
      byAir: "Visakhapatnam Airport (120 km)"
    },
    rating: 4.7,
    popularity: 90
  },
  {
    name: "Horsley Hills",
    description: "A charming hill station known for its pleasant climate, eucalyptus trees, and adventure activities.",
    location: "Horsley Hills",
    district: "Chittoor",
    category: "Hill Station",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
        caption: "Horsley Hills View Point"
      }
    ],
    coordinates: { latitude: 13.6667, longitude: 78.4000 },
    bestTimeToVisit: "October to June",
    attractions: [
      { name: "Gali Bandalu", description: "Wind rocks formation" },
      { name: "Kalyani", description: "Natural spring" },
      { name: "Environmental Park", description: "Nature conservation area" }
    ],
    activities: ["Rock climbing", "Rappelling", "Nature walks", "Photography"],
    entryFee: { indian: 20, foreign: 50 },
    timings: { open: "06:00 AM", close: "06:00 PM" },
    howToReach: {
      byRoad: "142 km from Bangalore",
      byRail: "Madanapalle Railway Station (60 km)",
      byAir: "Bangalore Airport (150 km)"
    },
    rating: 4.4,
    popularity: 70
  },

  // Coastal Destinations
  {
    name: "Visakhapatnam Beaches",
    description: "Known as Vizag, this coastal city offers beautiful beaches, naval heritage, and modern attractions.",
    location: "Visakhapatnam",
    district: "Visakhapatnam",
    category: "Coastal",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
        caption: "Vizag Beach"
      },
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        caption: "Sunset at RK Beach"
      }
    ],
    coordinates: { latitude: 17.6868, longitude: 83.2185 },
    bestTimeToVisit: "October to March",
    attractions: [
      { name: "RK Beach", description: "Popular beach with submarine museum" },
      { name: "Kailasagiri", description: "Hilltop park with panoramic views" },
      { name: "Submarine Museum", description: "Decommissioned submarine turned museum" },
      { name: "Borra Caves", description: "Famous limestone caves nearby" }
    ],
    activities: ["Beach activities", "Water sports", "Dolphin spotting", "Naval museum visit"],
    entryFee: { indian: 0, foreign: 0 },
    timings: { open: "24 hours", close: "24 hours", note: "Beaches open 24/7" },
    howToReach: {
      byRoad: "National Highway connectivity",
      byRail: "Visakhapatnam Railway Station",
      byAir: "Visakhapatnam Airport"
    },
    rating: 4.5,
    popularity: 88
  },

  // Historical Places
  {
    name: "Golkonda Fort",
    description: "A magnificent ruined city and fortress, famous for its acoustic marvels and diamond history.",
    location: "Golkonda",
    district: "Hyderabad",
    category: "Historical",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        caption: "Golkonda Fort"
      }
    ],
    coordinates: { latitude: 17.3833, longitude: 78.4011 },
    bestTimeToVisit: "October to March",
    attractions: [
      { name: "Main Fort", description: "Historic fortification" },
      { name: "Acoustic System", description: "Ancient sound engineering" },
      { name: "Fateh Rahben Gun", description: "Historic cannon" }
    ],
    activities: ["Fort exploration", "Photography", "Sound and light show"],
    entryFee: { indian: 15, foreign: 200 },
    timings: { open: "09:00 AM", close: "05:30 PM" },
    howToReach: {
      byRoad: "11 km from Hyderabad city center",
      byRail: "Hyderabad Railway Station (15 km)",
      byAir: "Hyderabad Airport (30 km)"
    },
    rating: 4.3,
    popularity: 75
  },
  {
    name: "Lepakshi Temple",
    description: "Famous for its hanging pillar, Veerabhadra temple showcases exemplary Vijayanagara architecture.",
    location: "Lepakshi",
    district: "Anantapur",
    category: "Historical",
    images: [
      {
        url: "https://images.unsplash.com/photo-1609831350050-3b5b55ad04ca?w=800",
        caption: "Lepakshi Temple Architecture"
      }
    ],
    coordinates: { latitude: 14.1275, longitude: 77.6183 },
    bestTimeToVisit: "October to March",
    attractions: [
      { name: "Hanging Pillar", description: "Architectural marvel" },
      { name: "Veerabhadra Temple", description: "16th century temple" },
      { name: "Nandi Bull", description: "Largest monolithic Nandi" }
    ],
    activities: ["Temple tour", "Architecture photography", "Historical exploration"],
    entryFee: { indian: 10, foreign: 50 },
    timings: { open: "06:00 AM", close: "06:00 PM" },
    howToReach: {
      byRoad: "120 km from Bangalore",
      byRail: "Penukonda Railway Station (15 km)",
      byAir: "Bangalore Airport (140 km)"
    },
    rating: 4.4,
    popularity: 65
  },

  // Natural Wonders
  {
    name: "Borra Caves",
    description: "Million-year-old limestone caves with spectacular stalactite and stalagmite formations.",
    location: "Ananthagiri Hills",
    district: "Visakhapatnam",
    category: "Natural",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544892504-5a42d285ab6f?w=800",
        caption: "Borra Caves Interior"
      }
    ],
    coordinates: { latitude: 18.2810, longitude: 82.9068 },
    bestTimeToVisit: "October to June",
    attractions: [
      { name: "Stalactite Formations", description: "Natural limestone formations" },
      { name: "Shiva Parvati Formation", description: "Natural rock sculpture" },
      { name: "Cave Chambers", description: "Multiple interconnected caves" }
    ],
    activities: ["Cave exploration", "Photography", "Geological study"],
    entryFee: { indian: 40, foreign: 100 },
    timings: { open: "10:00 AM", close: "05:00 PM" },
    howToReach: {
      byRoad: "Via Araku Valley road",
      byRail: "Borra Guhalu Railway Station",
      byAir: "Visakhapatnam Airport (90 km)"
    },
    rating: 4.6,
    popularity: 80
  },
  {
    name: "Belum Caves",
    description: "The longest caves in the Indian subcontinent, formed by groundwater flow.",
    location: "Belum",
    district: "Kurnool",
    category: "Natural",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800",
        caption: "Belum Caves"
      }
    ],
    coordinates: { latitude: 15.1167, longitude: 78.0500 },
    bestTimeToVisit: "October to March",
    attractions: [
      { name: "Meditation Hall", description: "Large underground chamber" },
      { name: "Kotumba Chamber", description: "Musical formations" },
      { name: "Banyan Tree Hall", description: "Expansive cave hall" }
    ],
    activities: ["Cave exploration", "Photography", "Educational tours"],
    entryFee: { indian: 35, foreign: 100 },
    timings: { open: "10:00 AM", close: "05:00 PM" },
    howToReach: {
      byRoad: "106 km from Kurnool",
      byRail: "Tadipatri Railway Station (30 km)",
      byAir: "Hyderabad Airport (320 km)"
    },
    rating: 4.5,
    popularity: 70
  },

  // More destinations...
  {
    name: "Amaravati",
    description: "Ancient Buddhist site and current capital city, known for its rich archaeological heritage.",
    location: "Amaravati",
    district: "Guntur",
    category: "Historical",
    images: [
      {
        url: "https://images.unsplash.com/photo-1609831350050-3b5b55ad04ca?w=800",
        caption: "Amaravati Buddhist Site"
      }
    ],
    coordinates: { latitude: 16.5062, longitude: 80.5510 },
    bestTimeToVisit: "October to March",
    attractions: [
      { name: "Amaravati Stupa", description: "Ancient Buddhist monument" },
      { name: "Archaeological Museum", description: "Buddhist artifacts collection" },
      { name: "Dhyana Buddha", description: "Large Buddha statue" }
    ],
    activities: ["Archaeological exploration", "Museum visit", "Photography"],
    entryFee: { indian: 10, foreign: 100 },
    timings: { open: "09:00 AM", close: "05:00 PM" },
    howToReach: {
      byRoad: "30 km from Vijayawada",
      byRail: "Vijayawada Railway Station (35 km)",
      byAir: "Vijayawada Airport (45 km)"
    },
    rating: 4.2,
    popularity: 60
  },
  {
    name: "Papikondalu",
    description: "Scenic hills along the Godavari River, perfect for boat cruises and nature lovers.",
    location: "Papikondalu",
    district: "West Godavari",
    category: "Natural",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        caption: "Papikondalu Hills"
      }
    ],
    coordinates: { latitude: 17.6000, longitude: 81.1000 },
    bestTimeToVisit: "October to March",
    attractions: [
      { name: "Godavari River Cruise", description: "Scenic boat journey" },
      { name: "Papi Hills", description: "Lush green hills" },
      { name: "Tribal Villages", description: "Indigenous communities" }
    ],
    activities: ["River cruise", "Photography", "Tribal culture experience"],
    entryFee: { indian: 500, foreign: 1000 },
    timings: { open: "07:00 AM", close: "06:00 PM" },
    howToReach: {
      byRoad: "Via Rajahmundry",
      byRail: "Rajahmundry Railway Station",
      byAir: "Rajahmundry Airport"
    },
    rating: 4.7,
    popularity: 85
  }
];

// Comprehensive Hotels Data
const hotels = [
  // Tirupati Hotels
  {
    name: "Marasa Sarovar Premiere",
    description: "Luxury hotel near Tirumala temple with modern amenities and spiritual ambiance.",
    location: "Tirupati",
    address: "Air Port Road, Tirupati, Andhra Pradesh 517502",
    category: "Luxury",
    starRating: 4,
    images: [
      { url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800", caption: "Hotel Exterior" },
      { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800", caption: "Luxury Room" }
    ],
    coordinates: { latitude: 13.6288, longitude: 79.4192 },
    priceRange: { min: 4500, max: 8000 },
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Room Service", "Airport Shuttle"],
    roomTypes: [
      { type: "Deluxe Room", price: 4500, capacity: 2, amenities: ["AC", "TV", "Mini Bar"] },
      { type: "Suite", price: 8000, capacity: 4, amenities: ["AC", "TV", "Mini Bar", "Living Area"] }
    ],
    contact: { phone: "+91-877-2233456", email: "reservations@marasasarovar.com" },
    rating: 4.4,
    totalBookings: 1250
  },
  {
    name: "Fortune Select Grand Ridge",
    description: "Premium business hotel with excellent facilities and proximity to temple.",
    location: "Tirupati",
    address: "Bypass Road, Tirupati, Andhra Pradesh 517501",
    category: "Luxury",
    starRating: 4,
    images: [
      { url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800", caption: "Hotel Lobby" }
    ],
    coordinates: { latitude: 13.6500, longitude: 79.4200 },
    priceRange: { min: 5000, max: 9500 },
    amenities: ["Free WiFi", "Fitness Center", "Business Center", "Restaurant", "Bar"],
    roomTypes: [
      { type: "Superior Room", price: 5000, capacity: 2, amenities: ["AC", "TV", "Work Desk"] },
      { type: "Executive Suite", price: 9500, capacity: 3, amenities: ["AC", "TV", "Separate Living Room"] }
    ],
    contact: { phone: "+91-877-2244567", email: "tirupati@fortunehotels.in" },
    rating: 4.3,
    totalBookings: 980
  },

  // Visakhapatnam Hotels
  {
    name: "Novotel Visakhapatnam Varun Beach",
    description: "Beachfront luxury resort with stunning ocean views and world-class amenities.",
    location: "Visakhapatnam",
    address: "Beach Road, Visakhapatnam, Andhra Pradesh 530023",
    category: "Resort",
    starRating: 5,
    images: [
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", caption: "Beach Resort View" },
      { url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800", caption: "Ocean View Room" }
    ],
    coordinates: { latitude: 17.7231, longitude: 83.3232 },
    priceRange: { min: 8000, max: 15000 },
    amenities: ["Beach Access", "Swimming Pool", "Spa", "Multiple Restaurants", "Water Sports"],
    roomTypes: [
      { type: "Superior Room", price: 8000, capacity: 2, amenities: ["Ocean View", "AC", "Balcony"] },
      { type: "Beach Villa", price: 15000, capacity: 4, amenities: ["Private Beach Access", "Jacuzzi"] }
    ],
    contact: { phone: "+91-891-2820000", email: "h1647@accor.com" },
    rating: 4.6,
    totalBookings: 2100
  },
  {
    name: "The Park Visakhapatnam",
    description: "Contemporary luxury hotel in the heart of the city with modern design.",
    location: "Visakhapatnam",
    address: "Beach Road, Visakhapatnam, Andhra Pradesh 530023",
    category: "Luxury",
    starRating: 5,
    images: [
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", caption: "Modern Hotel Design" }
    ],
    coordinates: { latitude: 17.7200, longitude: 83.3100 },
    priceRange: { min: 7000, max: 12000 },
    amenities: ["Rooftop Pool", "Fitness Center", "Spa", "Multiple Dining Options"],
    roomTypes: [
      { type: "Luxury Room", price: 7000, capacity: 2, amenities: ["City View", "AC", "Premium Amenities"] },
      { type: "Presidential Suite", price: 12000, capacity: 4, amenities: ["Panoramic Views", "Butler Service"] }
    ],
    contact: { phone: "+91-891-6699999", email: "reservations.vizag@theparkhotels.com" },
    rating: 4.5,
    totalBookings: 1800
  },

  // Araku Valley Hotels
  {
    name: "Haritha Valley Resort",
    description: "Government-run resort nestled in the scenic Araku Valley with comfortable accommodations.",
    location: "Araku Valley",
    address: "Araku Valley, Visakhapatnam District, Andhra Pradesh 531149",
    category: "Resort",
    starRating: 3,
    images: [
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", caption: "Valley Resort" }
    ],
    coordinates: { latitude: 18.3273, longitude: 82.8739 },
    priceRange: { min: 2500, max: 4500 },
    amenities: ["Mountain Views", "Restaurant", "Conference Hall", "Garden"],
    roomTypes: [
      { type: "Standard Room", price: 2500, capacity: 2, amenities: ["Valley View", "AC", "Balcony"] },
      { type: "Cottage", price: 4500, capacity: 4, amenities: ["Private Garden", "Kitchen"] }
    ],
    contact: { phone: "+91-8936-244000", email: "haritha.araku@aptdc.gov.in" },
    rating: 4.0,
    totalBookings: 650
  },

  // Budget Hotels
  {
    name: "Hotel Sindhuri Park",
    description: "Comfortable budget hotel in Tirupati with basic amenities and good service.",
    location: "Tirupati",
    address: "TP Area, Tirupati, Andhra Pradesh 517501",
    category: "Budget",
    starRating: 2,
    images: [
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800", caption: "Budget Hotel Room" }
    ],
    coordinates: { latitude: 13.6300, longitude: 79.4100 },
    priceRange: { min: 1200, max: 2500 },
    amenities: ["Free WiFi", "Restaurant", "Room Service", "Parking"],
    roomTypes: [
      { type: "Standard Room", price: 1200, capacity: 2, amenities: ["AC", "TV"] },
      { type: "Family Room", price: 2500, capacity: 4, amenities: ["AC", "TV", "Extra Bed"] }
    ],
    contact: { phone: "+91-877-2289000", email: "sindhuripark@gmail.com" },
    rating: 3.8,
    totalBookings: 890
  },

  // Heritage Hotels
  {
    name: "Taj Deccan",
    description: "Heritage luxury hotel in Hyderabad with royal ambiance and modern facilities.",
    location: "Hyderabad",
    address: "Road No. 1, Banjara Hills, Hyderabad, Andhra Pradesh 500034",
    category: "Heritage",
    starRating: 5,
    images: [
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", caption: "Heritage Hotel" }
    ],
    coordinates: { latitude: 17.4239, longitude: 78.4738 },
    priceRange: { min: 10000, max: 25000 },
    amenities: ["Heritage Architecture", "Luxury Spa", "Fine Dining", "Royal Suites"],
    roomTypes: [
      { type: "Heritage Room", price: 10000, capacity: 2, amenities: ["Royal Decor", "Premium Amenities"] },
      { type: "Royal Suite", price: 25000, capacity: 4, amenities: ["Palace-style Interiors", "Butler Service"] }
    ],
    contact: { phone: "+91-40-6666-9999", email: "deccan.hyderabad@tajhotels.com" },
    rating: 4.7,
    totalBookings: 3200
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/andhra-wander-hub');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Destination.deleteMany({});
    await Hotel.deleteMany({});
    console.log('Cleared existing data');

    // Insert destinations
    const insertedDestinations = await Destination.insertMany(destinations);
    console.log(`Inserted ${insertedDestinations.length} destinations`);

    // Update hotels with nearby destinations
    for (let hotel of hotels) {
      // Find nearby destinations based on location
      const nearbyDests = insertedDestinations.filter(dest => 
        dest.location.toLowerCase().includes(hotel.location.toLowerCase()) ||
        hotel.location.toLowerCase().includes(dest.location.toLowerCase())
      );
      
      hotel.nearbyDestinations = nearbyDests.slice(0, 3).map(dest => dest._id);
    }

    // Insert hotels
    const insertedHotels = await Hotel.insertMany(hotels);
    console.log(`Inserted ${insertedHotels.length} hotels`);

    // Update destinations with nearby hotels
    for (let destination of insertedDestinations) {
      const nearbyHotels = insertedHotels.filter(hotel => 
        hotel.location.toLowerCase().includes(destination.location.toLowerCase()) ||
        destination.location.toLowerCase().includes(hotel.location.toLowerCase())
      );
      
      destination.nearbyHotels = nearbyHotels.slice(0, 5).map(hotel => hotel._id);
      await destination.save();
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📍 Total Destinations: ${insertedDestinations.length}`);
    console.log(`🏨 Total Hotels: ${insertedHotels.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase();