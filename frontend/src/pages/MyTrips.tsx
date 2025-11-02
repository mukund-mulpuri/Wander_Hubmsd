import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Star,
  Download,
  Phone,
  Mail,
  Navigation,
  Camera,
  Heart,
  Share2,
  MessageCircle
} from 'lucide-react';

interface TripBooking {
  bookingId: string;
  tripDetails: {
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
    budget: string;
  };
  bookingStatus: 'confirmed' | 'completed' | 'cancelled' | 'upcoming';
  paymentDetails: {
    totalAmount: number;
    paymentStatus: string;
    transactionId: string;
  };
  createdAt: string;
  itinerary?: any[];
  feedback?: {
    rating: number;
    comment: string;
  };
}

const MyTrips: React.FC = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<TripBooking[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading trip data
    setTimeout(() => {
      const demoTrips: TripBooking[] = [
        {
          bookingId: 'TRB123456',
          tripDetails: {
            destination: 'Tirupati',
            startDate: '2025-12-15',
            endDate: '2025-12-18',
            travelers: 2,
            budget: 'mid-range'
          },
          bookingStatus: 'upcoming',
          paymentDetails: {
            totalAmount: 25000,
            paymentStatus: 'completed',
            transactionId: 'TXN789012'
          },
          createdAt: '2025-10-25',
          itinerary: [
            {
              day: 1,
              date: '2025-12-15',
              activities: [
                { time: '09:00 AM', activity: 'Tirumala Temple Darshan', location: 'Tirumala' },
                { time: '02:00 PM', activity: 'Sri Venkateswara Museum', location: 'Tirupati' },
                { time: '06:00 PM', activity: 'Local Market Visit', location: 'Tirupati' }
              ]
            }
          ]
        },
        {
          bookingId: 'TRB789012',
          tripDetails: {
            destination: 'Araku Valley',
            startDate: '2025-09-10',
            endDate: '2025-09-13',
            travelers: 4,
            budget: 'luxury'
          },
          bookingStatus: 'completed',
          paymentDetails: {
            totalAmount: 45000,
            paymentStatus: 'completed',
            transactionId: 'TXN345678'
          },
          createdAt: '2025-08-15',
          feedback: {
            rating: 5,
            comment: 'Amazing trip! The coffee plantations were beautiful and the weather was perfect.'
          }
        },
        {
          bookingId: 'TRB345678',
          tripDetails: {
            destination: 'Visakhapatnam',
            startDate: '2025-06-20',
            endDate: '2025-06-24',
            travelers: 3,
            budget: 'budget'
          },
          bookingStatus: 'completed',
          paymentDetails: {
            totalAmount: 18000,
            paymentStatus: 'completed',
            transactionId: 'TXN901234'
          },
          createdAt: '2025-05-10',
          feedback: {
            rating: 4,
            comment: 'Great beaches and seafood. Budget-friendly options were excellent.'
          }
        }
      ];
      setTrips(demoTrips);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return trip.bookingStatus === 'upcoming' || trip.bookingStatus === 'confirmed';
    if (activeTab === 'completed') return trip.bookingStatus === 'completed';
    if (activeTab === 'cancelled') return trip.bookingStatus === 'cancelled';
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your trips...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
            <p className="text-gray-600">Manage and track all your Andhra Pradesh adventures</p>
          </div>
          <Button 
            onClick={() => navigate('/trip-planner')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Plan New Trip
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{trips.length}</div>
              <div className="text-sm text-gray-600">Total Trips</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {trips.filter(t => t.bookingStatus === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {trips.filter(t => t.bookingStatus === 'upcoming' || t.bookingStatus === 'confirmed').length}
              </div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                ₹{trips.reduce((sum, trip) => sum + trip.paymentDetails.totalAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </CardContent>
          </Card>
        </div>

        {/* Trips Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Trips</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {filteredTrips.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-gray-400 mb-4">
                    <MapPin className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips found</h3>
                  <p className="text-gray-600 mb-4">
                    {activeTab === 'all' 
                      ? "You haven't booked any trips yet." 
                      : `No ${activeTab} trips found.`}
                  </p>
                  <Button 
                    onClick={() => navigate('/trip-planner')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Plan Your First Trip
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredTrips.map((trip) => (
                  <Card key={trip.bookingId} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2 mb-2">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            {trip.tripDetails.destination}
                          </CardTitle>
                          <CardDescription>
                            Booking ID: {trip.bookingId}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(trip.bookingStatus)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(trip.bookingStatus)}
                            {trip.bookingStatus.charAt(0).toUpperCase() + trip.bookingStatus.slice(1)}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Trip Details */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Trip Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{formatDate(trip.tripDetails.startDate)} - {formatDate(trip.tripDetails.endDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{calculateDuration(trip.tripDetails.startDate, trip.tripDetails.endDate)} days</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{trip.tripDetails.travelers} travelers</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-gray-500" />
                              <span className="capitalize">{trip.tripDetails.budget} package</span>
                            </div>
                          </div>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Payment</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Total Amount:</span>
                              <span className="font-semibold">₹{trip.paymentDetails.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Status:</span>
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                {trip.paymentDetails.paymentStatus}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Transaction ID:</span>
                              <span className="font-mono text-xs">{trip.paymentDetails.transactionId}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions & Rating */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Actions</h4>
                          <div className="space-y-2">
                            {trip.bookingStatus === 'upcoming' && (
                              <>
                                <Button size="sm" variant="outline" className="w-full">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Itinerary
                                </Button>
                                <Button size="sm" variant="outline" className="w-full">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Contact Support
                                </Button>
                              </>
                            )}
                            
                            {trip.bookingStatus === 'completed' && trip.feedback && (
                              <div className="bg-yellow-50 p-3 rounded-lg">
                                <div className="flex items-center gap-1 mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < trip.feedback!.rating 
                                          ? 'text-yellow-500 fill-current' 
                                          : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                  <span className="text-sm font-medium ml-1">{trip.feedback.rating}/5</span>
                                </div>
                                <p className="text-xs text-gray-600">{trip.feedback.comment}</p>
                              </div>
                            )}
                            
                            {trip.bookingStatus === 'completed' && !trip.feedback && (
                              <Button size="sm" variant="outline" className="w-full text-yellow-600 border-yellow-600">
                                <Star className="h-4 w-4 mr-2" />
                                Rate Your Trip
                              </Button>
                            )}
                            
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="flex-1">
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                              <Button size="sm" variant="ghost" className="flex-1">
                                <Heart className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Itinerary Preview */}
                      {trip.itinerary && trip.itinerary.length > 0 && (
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="font-semibold text-gray-900 mb-3">Itinerary Preview</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900 mb-2">
                                Day 1 - {formatDate(trip.itinerary[0].date)}
                              </div>
                              {trip.itinerary[0].activities.slice(0, 2).map((activity: any, index: number) => (
                                <div key={index} className="flex items-center gap-2 text-gray-600 mb-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{activity.time} - {activity.activity}</span>
                                </div>
                              ))}
                              {trip.itinerary[0].activities.length > 2 && (
                                <div className="text-gray-500 text-xs">
                                  +{trip.itinerary[0].activities.length - 2} more activities
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyTrips;