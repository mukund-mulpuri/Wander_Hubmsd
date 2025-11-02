import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About Andhra Wander Hub</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Welcome to Andhra Wander Hub, your ultimate guide to exploring the beautiful state of Andhra Pradesh. 
                We are passionate about showcasing the rich cultural heritage, stunning landscapes, and incredible 
                hospitality that Andhra Pradesh has to offer.
              </p>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="mb-6">
                Our mission is to make travel in Andhra Pradesh accessible, enjoyable, and memorable for everyone. 
                We provide comprehensive information about destinations, accommodations, local cuisine, and cultural experiences.
              </p>
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Detailed destination guides and recommendations</li>
                <li>Hotel and accommodation booking assistance</li>
                <li>Cultural and historical insights</li>
                <li>Local cuisine recommendations</li>
                <li>Travel planning and itinerary suggestions</li>
              </ul>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                Have questions or need assistance planning your trip? Feel free to reach out to our friendly team 
                who are always ready to help make your Andhra Pradesh experience unforgettable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;