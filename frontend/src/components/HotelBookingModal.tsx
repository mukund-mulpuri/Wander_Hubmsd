import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  X, 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  IndianRupee,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell
} from 'lucide-react';

// Simple Label component to avoid import issues
const Label: React.FC<{ htmlFor?: string; children: React.ReactNode; className?: string }> = 
  ({ htmlFor, children, className = '' }) => (
    <label 
      htmlFor={htmlFor} 
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );

interface Hotel {
  id: number;
  name: string;
  location: string;
  category: string;
  type: string;
  description: string;
  image: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  roomTypes: string[];
  nearbyAttractions: string[];
  features: string[];
}

interface HotelBookingModalProps {
  hotel: Hotel;
  isOpen: boolean;
  onClose: () => void;
}

const HotelBookingModal: React.FC<HotelBookingModalProps> = ({ hotel, isOpen, onClose }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState(hotel.roomTypes[0] || '');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return nights > 0 ? nights : 1;
    }
    return 1;
  };

  const getTotalAmount = () => {
    const nights = calculateNights();
    const basePrice = hotel.pricePerNight * rooms * nights;
    const taxes = basePrice * 0.12; // 12% GST
    return basePrice + taxes;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Luxury': return 'bg-purple-100 text-purple-800';
      case 'Mid-Range': return 'bg-blue-100 text-blue-800';
      case 'Budget': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('parking') || amenity.toLowerCase().includes('valet')) return <Car className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('coffee') || amenity.toLowerCase().includes('breakfast')) return <Coffee className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('restaurant') || amenity.toLowerCase().includes('dining')) return <Utensils className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('gym') || amenity.toLowerCase().includes('fitness')) return <Dumbbell className="h-4 w-4" />;
    return null;
  };

  if (!isOpen) return null;

  if (isBookingConfirmed) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl text-green-600">Booking Confirmed!</CardTitle>
            <CardDescription>
              Your reservation at {hotel.name} has been confirmed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Booking ID:</span>
                <span>HTL{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Check-in:</span>
                <span>{new Date(checkInDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Check-out:</span>
                <span>{new Date(checkOutDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold">₹{getTotalAmount().toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              A confirmation email has been sent to {guestEmail}
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full md:w-48 h-32 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = '/images/hotels/placeholder.svg';
              }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-xl">{hotel.name}</CardTitle>
                <Badge className={getCategoryColor(hotel.category)}>
                  {hotel.category}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1 mb-2">
                <MapPin className="h-4 w-4" />
                {hotel.location}
              </CardDescription>
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{hotel.rating}</span>
                <span className="text-sm text-gray-600">({hotel.type})</span>
              </div>
              <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                <IndianRupee className="h-4 w-4" />
                {hotel.pricePerNight.toLocaleString()}
                <span className="text-sm font-normal text-gray-600">/night</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleBooking} className="space-y-6">
            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkin">Check-in Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="checkin"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="pl-10"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="checkout">Check-out Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="checkout"
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="pl-10"
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="rooms">Number of Rooms</Label>
                <Input
                  id="rooms"
                  type="number"
                  min="1"
                  max="5"
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            {/* Room Type Selection */}
            <div>
              <Label>Room Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                {hotel.roomTypes.map((roomType) => (
                  <label key={roomType} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="roomType"
                      value={roomType}
                      checked={selectedRoomType === roomType}
                      onChange={(e) => setSelectedRoomType(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-sm">{roomType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Guest Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Guest Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="pl-10"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="pl-10"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Preview */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Hotel Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {hotel.amenities.slice(0, 8).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {getAmenityIcon(amenity) || <span className="w-4 h-4 bg-green-500 rounded-full"></span>}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Room Rate (₹{hotel.pricePerNight.toLocaleString()} × {rooms} room × {calculateNights()} nights)</span>
                  <span>₹{(hotel.pricePerNight * rooms * calculateNights()).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees (12% GST)</span>
                  <span>₹{(hotel.pricePerNight * rooms * calculateNights() * 0.12).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{getTotalAmount().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Payment Method</h3>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  🔒 Secure payment processing. Your booking will be confirmed instantly upon payment.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                Confirm Booking - ₹{getTotalAmount().toLocaleString()}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelBookingModal;