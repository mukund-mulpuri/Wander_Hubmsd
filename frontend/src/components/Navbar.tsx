import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, LogOut, History, MapPin, Plane, Calendar, ChevronDown, Star, MapPin as MapPinIcon } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { staticDestinations } from "@/lib/staticData";

// Comprehensive Destinations with Photos
const comprehensiveDestinations = [
  // Pilgrimage Sites
  {
    name: "Tirumala Venkateswara Temple",
    location: "Tirupati",
    category: "Pilgrimage",
    image: "/images/destinations/tirumala-temple.jpg",
    rating: 4.8,
    description: "Sacred temple of Lord Venkateswara"
  },
  {
    name: "Srisailam Temple",
    location: "Kurnool",
    category: "Pilgrimage", 
    image: "/images/destinations/srisailam-temple.jpg",
    rating: 4.7,
    description: "One of 12 Jyotirlingas"
  },
  {
    name: "Simhachalam Temple",
    location: "Visakhapatnam",
    category: "Pilgrimage",
    image: "/images/destinations/simhachalam-temple.jpg",
    rating: 4.5,
    description: "Lord Narasimha temple on hilltop"
  },
  {
    name: "Sri Kalahasti Temple",
    location: "Chittoor",
    category: "Pilgrimage",
    image: "/images/destinations/kalahasti-temple.jpg",
    rating: 4.6,
    description: "Vayu Sthalam representing air element"
  },
  {
    name: "Kanipakam Temple",
    location: "Chittoor",
    category: "Pilgrimage",
    image: "/images/destinations/kanipakam-temple.jpg",
    rating: 4.5,
    description: "Growing Ganesha temple"
  },
  {
    name: "Annavaram Temple",
    location: "East Godavari",
    category: "Pilgrimage",
    image: "/images/destinations/annavaram-temple.jpg",
    rating: 4.6,
    description: "Lord Satyanarayana Swamy shrine"
  },
  {
    name: "Kanaka Durga Temple",
    location: "Vijayawada",
    category: "Pilgrimage",
    image: "/images/destinations/kanaka-durga-temple.jpg",
    rating: 4.5,
    description: "Goddess Durga temple with river views"
  },
  {
    name: "Yaganti Temple",
    location: "Kurnool",
    category: "Pilgrimage",
    image: "/images/destinations/yaganti-temple.jpg",
    rating: 4.4,
    description: "Growing Nandi temple with caves"
  },

  // Hill Stations
  {
    name: "Araku Valley",
    location: "Visakhapatnam",
    category: "Hill Station",
    image: "/images/destinations/araku-valley.jpg",
    rating: 4.6,
    description: "Coffee plantations & tribal culture"
  },
  {
    name: "Horsley Hills",
    location: "Chittoor",
    category: "Hill Station",
    image: "/images/destinations/horsley-hills.jpg",
    rating: 4.3,
    description: "Summer retreat with pleasant climate"
  },
  {
    name: "Chintapalli",
    location: "Visakhapatnam", 
    category: "Hill Station",
    image: "/images/destinations/chintapalli.jpg",
    rating: 4.2,
    description: "Coffee & pepper plantations"
  },

  // Coastal Destinations  
  {
    name: "Rishikonda Beach",
    location: "Visakhapatnam",
    category: "Coastal",
    image: "/images/destinations/rishikonda-beach.jpg",
    rating: 4.5,
    description: "Golden sand beach with water sports"
  },
  {
    name: "Kakinada Beach",
    location: "East Godavari",
    category: "Coastal",
    image: "/images/destinations/kakinada-beach.jpg",
    rating: 4.4,
    description: "Coastal city with mangrove sanctuary"
  },
  {
    name: "Uppada Beach",
    location: "East Godavari",
    category: "Coastal", 
    image: "/images/destinations/uppada-beach.jpg",
    rating: 4.2,
    description: "Pristine beach with handloom sarees"
  },
  {
    name: "Machilipatnam Beach",
    location: "Krishna",
    category: "Coastal",
    image: "/images/destinations/machilipatnam-beach.jpg",
    rating: 4.0,
    description: "Historic port town with lighthouse"
  },
  {
    name: "Mypad Beach",
    location: "Nellore",
    category: "Coastal",
    image: "/images/destinations/mypad-beach.jpg",
    rating: 4.0,
    description: "Serene beach with golden sand"
  },

  // Natural Attractions
  {
    name: "Gandikota",
    location: "Kadapa",
    category: "Natural",
    image: "/images/destinations/gandikota.jpg",
    rating: 4.7,
    description: "Grand Canyon of India"
  },
  {
    name: "Belum Caves",
    location: "Kurnool",
    category: "Natural",
    image: "/images/destinations/belum-caves.jpg",
    rating: 4.5,
    description: "India's longest cave system"
  },
  {
    name: "Borra Caves", 
    location: "Visakhapatnam",
    category: "Natural",
    image: "/images/destinations/borra-caves.jpg",
    rating: 4.4,
    description: "Million-year-old limestone caves"
  },
  {
    name: "Talakona Waterfalls",
    location: "Chittoor",
    category: "Natural",
    image: "/images/destinations/talakona-waterfalls.jpg",
    rating: 4.3,
    description: "Highest waterfall in Andhra Pradesh"
  },
  {
    name: "Papikondalu",
    location: "East Godavari",
    category: "Natural",
    image: "/images/destinations/papikondalu.jpg",
    rating: 4.7,
    description: "Scenic hills along Godavari River"
  },
  {
    name: "Kolleru Lake",
    location: "West Godavari",
    category: "Natural",
    image: "/images/destinations/kolleru-lake.jpg",
    rating: 4.3,
    description: "Largest freshwater lake & bird sanctuary"
  },
  {
    name: "Pulicat Lake",
    location: "Nellore",
    category: "Natural",
    image: "/images/destinations/pulicat-lake.jpg",
    rating: 4.2,
    description: "Brackish water lagoon with flamingos"
  },
  {
    name: "Ethipothala Waterfalls",
    location: "Guntur",
    category: "Natural",
    image: "/images/destinations/ethipothala-waterfalls.jpg",
    rating: 4.3,
    description: "Beautiful waterfall with crocodile center"
  },
  {
    name: "Kailasagiri",
    location: "Visakhapatnam",
    category: "Natural",
    image: "/images/destinations/kailasagiri.jpg",
    rating: 4.4,
    description: "Hilltop park with cable car & city views"
  },
  {
    name: "Nagarjuna Sagar",
    location: "Nalgonda",
    category: "Natural",
    image: "/images/destinations/nagarjuna-sagar.jpg",
    rating: 4.3,
    description: "Massive dam with Buddhist heritage"
  },

  // Historical Sites
  {
    name: "Amaravati",
    location: "Guntur",
    category: "Historical",
    image: "/images/destinations/amaravati.jpg",
    rating: 4.3,
    description: "Buddhist heritage & capital city"
  },
  {
    name: "Lepakshi",
    location: "Anantapur",
    category: "Historical",
    image: "/images/destinations/lepakshi.jpg",
    rating: 4.4,
    description: "Hanging pillar & Veerabhadra temple"
  },
  {
    name: "Chandragiri Fort",
    location: "Chittoor",
    category: "Historical",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.2,
    description: "Indo-Saracenic architecture & museums"
  },
  {
    name: "Kondapalli Fort",
    location: "Krishna",
    category: "Historical",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.1,
    description: "14th century hill fort"
  },

  // Cultural Centers
  {
    name: "Vijayawada",
    location: "Krishna",
    category: "Cultural",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.2,
    description: "Kanaka Durga Temple & cultural hub"
  },
  {
    name: "Rajahmundry",
    location: "East Godavari",
    category: "Cultural", 
    image: "/images/destinations/placeholder.jpg",
    rating: 4.2,
    description: "Cultural capital & Godavari bridge"
  },
  {
    name: "Nellore",
    location: "Nellore",
    category: "Cultural",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.0,
    description: "Coastal city with temples & lakes"
  },
  {
    name: "Kadapa",
    location: "Kadapa",
    category: "Historical",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.1,
    description: "Historic city with Islamic architecture"
  }
];

// Comprehensive Hotels with Photos
const comprehensiveHotels = [
  {
    name: "Novotel Visakhapatnam Varun Beach",
    location: "Visakhapatnam",
    category: "Luxury",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.8,
    priceRange: "₹8,000 - ₹25,000",
    description: "Luxury beachfront hotel with ocean views"
  },
  {
    name: "Taj Deccan Hyderabad", 
    location: "Hyderabad",
    category: "Luxury",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.7,
    priceRange: "₹12,000 - ₹35,000",
    description: "Heritage luxury hotel with royal hospitality"
  },
  {
    name: "Sea Pearl Beach Resort",
    location: "Visakhapatnam",
    category: "Resort",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.4,
    priceRange: "₹7,000 - ₹18,000",
    description: "Beachfront resort with water sports"
  },
  {
    name: "Fortune Select Grand Ridge",
    location: "Tirupati",
    category: "Resort",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.5,
    priceRange: "₹6,000 - ₹15,000", 
    description: "Mountain resort near sacred temples"
  },
  {
    name: "Valley Resort Araku",
    location: "Araku Valley",
    category: "Resort",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.6,
    priceRange: "₹4,500 - ₹12,000",
    description: "Eco-friendly resort in coffee plantations"
  },
  {
    name: "Hotel Mayura Tirupati",
    location: "Tirupati",
    category: "Mid-Range",
    image: "/images/destinations/placeholder.jpg",
    rating: 4.2,
    priceRange: "₹3,000 - ₹7,000",
    description: "Pilgrimage hotel with temple shuttle"
  },
  {
    name: "Hotel Bliss Budget Stay",
    location: "Tirupati",
    category: "Budget",
    image: "/images/destinations/placeholder.jpg",
    rating: 3.8,
    priceRange: "₹1,500 - ₹4,000",
    description: "Budget-friendly with essential amenities"
  }
];

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [hotelSearch, setHotelSearch] = useState("");

  const handleLogout = () => {
    // Simple logout - just navigate to auth page
    navigate("/auth");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchValue)}`);
      if (onSearch) {
        onSearch(searchValue);
      }
    }
  };

  const handleStartTrip = () => {
    navigate("/trip-planner");
  };

  // Filter destinations based on search
  const filteredDestinations = comprehensiveDestinations.filter(dest =>
    dest.name.toLowerCase().includes(destinationSearch.toLowerCase()) ||
    dest.location.toLowerCase().includes(destinationSearch.toLowerCase()) ||
    dest.category.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  // Filter hotels based on search
  const filteredHotels = comprehensiveHotels.filter(hotel =>
    hotel.name.toLowerCase().includes(hotelSearch.toLowerCase()) ||
    hotel.location.toLowerCase().includes(hotelSearch.toLowerCase()) ||
    hotel.category.toLowerCase().includes(hotelSearch.toLowerCase())
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🏛️ Andhra WanderHub
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search destinations, hotels, places..."
              className="pl-10 pr-4 border-2 border-gray-200 focus:border-blue-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </div>

        <div className="flex items-center gap-2">
          {/* Start Your Trip Button */}
          <Button 
            onClick={handleStartTrip}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plane className="mr-2 h-4 w-4" />
            Start Your Trip
          </Button>

          {/* Navigation Links with Dropdowns */}
          
          {/* Destinations Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                <MapPin className="mr-1 h-4 w-4" />
                Destinations
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 max-h-96 overflow-y-auto">
              <div className="p-2">
                <div className="text-sm font-semibold text-gray-500 mb-2 px-2">
                  Explore Andhra Pradesh ({comprehensiveDestinations.length} places)
                </div>
                
                {/* Search input for destinations */}
                <div className="mb-3 px-2">
                  <Input
                    placeholder="Search destinations..."
                    value={destinationSearch}
                    onChange={(e) => setDestinationSearch(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>

                <div className="grid gap-1 max-h-64 overflow-y-auto">
                  {filteredDestinations.slice(0, 15).map((destination, index) => (
                    <DropdownMenuItem 
                      key={index}
                      className="p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate('/destinations')}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          onError={(e) => {
                            e.currentTarget.src = '/images/destinations/placeholder.svg';
                          }}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {destination.name}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPinIcon className="h-3 w-3 mr-1" />
                            {destination.location}
                            <span className="mx-2">•</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              destination.category === 'Pilgrimage' ? 'bg-orange-100 text-orange-800' :
                              destination.category === 'Hill Station' ? 'bg-green-100 text-green-800' :
                              destination.category === 'Coastal' ? 'bg-blue-100 text-blue-800' :
                              destination.category === 'Natural' ? 'bg-emerald-100 text-emerald-800' :
                              destination.category === 'Historical' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {destination.category}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{destination.rating}</span>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  
                  {filteredDestinations.length === 0 && (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No destinations found matching "{destinationSearch}"
                    </div>
                  )}
                  
                  {filteredDestinations.length > 15 && (
                    <div className="p-2 text-center text-xs text-gray-500">
                      Showing first 15 of {filteredDestinations.length} results
                    </div>
                  )}
                </div>
                <div className="border-t mt-2 pt-2">
                  <DropdownMenuItem 
                    className="text-center text-blue-600 font-medium"
                    onClick={() => navigate('/destinations')}
                  >
                    View All Destinations →
                  </DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hotels Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                🏨 Hotels
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 max-h-80 overflow-y-auto">
              <div className="p-2">
                <div className="text-sm font-semibold text-gray-500 mb-2 px-2">
                  Premium Accommodations ({comprehensiveHotels.length} hotels)
                </div>
                
                {/* Search input for hotels */}
                <div className="mb-3 px-2">
                  <Input
                    placeholder="Search hotels..."
                    value={hotelSearch}
                    onChange={(e) => setHotelSearch(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>

                <div className="grid gap-1 max-h-64 overflow-y-auto">
                  {filteredHotels.map((hotel, index) => (
                    <DropdownMenuItem 
                      key={index}
                      className="p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate('/hotels')}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = '/images/hotels/placeholder.svg';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {hotel.name}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPinIcon className="h-3 w-3 mr-1" />
                            {hotel.location}
                            <span className="mx-2">•</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              hotel.category === 'Luxury' ? 'bg-purple-100 text-purple-800' :
                              hotel.category === 'Resort' ? 'bg-green-100 text-green-800' :
                              hotel.category === 'Mid-Range' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {hotel.category}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600 ml-1">{hotel.rating}</span>
                            </div>
                            <span className="text-xs font-medium text-green-600">
                              {hotel.priceRange}
                            </span>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  
                  {filteredHotels.length === 0 && (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No hotels found matching "{hotelSearch}"
                    </div>
                  )}
                </div>
                <div className="border-t mt-2 pt-2">
                  <DropdownMenuItem 
                    className="text-center text-blue-600 font-medium"
                    onClick={() => navigate('/hotels')}
                  >
                    View All Hotels →
                  </DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/about">
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              About
            </Button>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/my-trips")}>
                <Calendar className="mr-2 h-4 w-4" />
                My Trips
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/history")}>
                <History className="mr-2 h-4 w-4" />
                Travel History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
