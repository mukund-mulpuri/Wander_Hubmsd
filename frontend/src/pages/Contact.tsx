import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                <div className="space-y-3">
                  <div>
                    <strong>Email:</strong>
                    <p className="text-gray-600">info@andhrawanderhub.com</p>
                  </div>
                  <div>
                    <strong>Phone:</strong>
                    <p className="text-gray-600">+91 12345 67890</p>
                  </div>
                  <div>
                    <strong>Address:</strong>
                    <p className="text-gray-600">
                      123 Tourism Street<br />
                      Vijayawada, Andhra Pradesh<br />
                      520001, India
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;