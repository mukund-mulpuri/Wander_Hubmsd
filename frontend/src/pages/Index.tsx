import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Andhra Wander Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the beautiful destinations, rich culture, and incredible hospitality of Andhra Pradesh. 
            Your journey through the heart of South India starts here.
          </p>
          <div className="space-x-4">
            <Link to="/destinations">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Destinations
              </Button>
            </Link>
            <Link to="/hotels">
              <Button variant="outline" size="lg">
                Find Hotels
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏛️ Historic Destinations
              </CardTitle>
              <CardDescription>
                Explore ancient temples, historical monuments, and cultural heritage sites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From the famous Tirupati temple to the Buddhist sites of Amaravati, 
                discover the rich history of Andhra Pradesh.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏔️ Natural Wonders
              </CardTitle>
              <CardDescription>
                Experience breathtaking landscapes and natural beauty
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Visit scenic hill stations like Araku Valley, explore limestone caves, 
                and enjoy pristine beaches along the coast.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏨 Comfortable Stay
              </CardTitle>
              <CardDescription>
                Find the perfect accommodation for your journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From luxury resorts to budget-friendly hotels, we help you find 
                the perfect place to stay during your adventure.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Popular Destinations Preview */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Tirupati</h3>
                <p className="text-gray-600 text-sm">Sacred pilgrimage destination</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Araku Valley</h3>
                <p className="text-gray-600 text-sm">Beautiful hill station</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Visakhapatnam</h3>
                <p className="text-gray-600 text-sm">Coastal city with beaches</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Srisailam</h3>
                <p className="text-gray-600 text-sm">Sacred temple in hills</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link to="/destinations">
              <Button variant="outline">View All Destinations</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;