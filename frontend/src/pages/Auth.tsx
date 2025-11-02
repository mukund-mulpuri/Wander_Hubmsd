import React from 'react';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Authentication</h2>
        <p className="text-center text-gray-600">
          Login or sign up to access your account
        </p>
      </div>
    </div>
  );
};

export default Auth;