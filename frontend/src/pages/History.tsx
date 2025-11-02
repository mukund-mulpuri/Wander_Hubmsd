import React from 'react';

const History: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Travel History</h1>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Tirupati Temple Visit</h3>
                  <p className="text-gray-600">March 15, 2024</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Completed</span>
              </div>
              <p className="text-gray-700 mb-2">
                Visited the famous Tirumala Venkateswara Temple and explored the surrounding areas.
              </p>
              <div className="text-sm text-gray-500">
                Duration: 2 days • Hotel: TTD Guest House
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Araku Valley Trip</h3>
                  <p className="text-gray-600">January 20, 2024</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Completed</span>
              </div>
              <p className="text-gray-700 mb-2">
                Enjoyed the scenic beauty of Araku Valley and took the famous train journey through Eastern Ghats.
              </p>
              <div className="text-sm text-gray-500">
                Duration: 3 days • Hotel: Araku Valley Resort
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Visakhapatnam Beach Holiday</h3>
                  <p className="text-gray-600">December 10, 2023</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Planned</span>
              </div>
              <p className="text-gray-700 mb-2">
                Planning to explore the beautiful beaches and naval museum in Visakhapatnam.
              </p>
              <div className="text-sm text-gray-500">
                Duration: 4 days • Hotel: Beach Resort
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;