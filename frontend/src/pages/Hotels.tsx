import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HotelBookingModal from '../components/HotelBookingModal';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { staticHotels } from '../lib/staticData';
import { 
  MapPin, 
  Star, 
  Search,
  Filter,
  Grid,
  List,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  Heart,
  Share2,
  Users,
  IndianRupee,
  Calendar,
  Phone
} from 'lucide-react';

const Hotels: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filteredHotels, setFilteredHotels] = useState(staticHotels);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const categories = ['All', 'Luxury', 'Mid-Range', 'Budget'];
  const priceRanges = ['All', 'Under ₹2000', '₹2000-₹5000', '₹5000-₹10000', 'Above ₹10000'];

  useEffect(() => {
    let filtered = staticHotels;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(hotel => hotel.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'All') {
      filtered = filtered.filter(hotel => {
        const price = hotel.pricePerNight;
        switch (priceRange) {
          case 'Under ₹2000':
            return price < 2000;
          case '₹2000-₹5000':
            return price >= 2000 && price <= 5000;
          case '₹5000-₹10000':
            return price >= 5000 && price <= 10000;
          case 'Above ₹10000':
            return price > 10000;
          default:
            return true;
        }
      });
    }

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.pricePerNight - b.pricePerNight;
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    setFilteredHotels(filtered);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Luxury': return 'bg-purple-100 text-purple-800';
      case 'Mid-Range': return 'bg-blue-100 text-blue-800';
      case 'Budget': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBookHotel = (hotel: any) => {
    setSelectedHotel(hotel);
    setIsBookingModalOpen(true);
  };

  const handleQuickCall = () => {
    window.open('tel:+918885551234', '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar onSearch={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hotels & Accommodations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect stay for your Andhra Pradesh adventure. From luxury palaces 
            to budget-friendly lodges, discover {staticHotels.length} carefully selected accommodations.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search hotels, locations, amenities..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
            {/* Price Range Filter */}
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Button
                  key={range}
                  variant={priceRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriceRange(range)}
                  className={priceRange === range ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {range}
                </Button>
              ))}
            </div>

            {/* Sort and View Mode */}
            <div className="flex gap-2 ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="location">Sort by Location</option>
              </select>
              
              <div className="flex border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredHotels.length} hotels found
            {selectedCategory !== 'All' && ` in ${selectedCategory} category`}
            {priceRange !== 'All' && ` in ${priceRange} range`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>

        {/* Hotels Grid/List */}
        {filteredHotels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredHotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.log('Hotel image failed to load:', hotel.image);
                      e.currentTarget.src = '/images/hotels/placeholder.svg';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={getCategoryColor(hotel.category)}>
                      {hotel.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 rounded-lg px-2 py-1">
                    <div className="flex items-center gap-1 text-sm font-bold text-green-600">
                      <IndianRupee className="h-3 w-3" />
                      {hotel.pricePerNight.toLocaleString()}
                      <span className="text-xs text-gray-600">/night</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold line-clamp-1">
                      {hotel.name}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{hotel.rating || 'N/A'}</span>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {hotel.location}
                  </CardDescription>
                  <div className="text-sm text-blue-600 font-medium">
                    {hotel.type}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {hotel.description}
                  </p>
                  
                  <div className="space-y-3">
                    {/* Amenities Preview */}
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{hotel.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Room Types */}
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Rooms:</span> {hotel.roomTypes.join(', ')}
                    </div>

                    {/* Key Features */}
                    <div className="flex gap-4 text-xs text-gray-500">
                      {hotel.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="flex items-center gap-1">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleBookHotel(hotel)}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Book Now
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="px-3"
                        onClick={handleQuickCall}
                        title="Quick Call for Booking"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedHotel && (
        <HotelBookingModal
          hotel={selectedHotel}
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedHotel(null);
          }}
        />
      )}
    </div>
  );
};

export default Hotels;