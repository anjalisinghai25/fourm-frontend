import React, { useState } from 'react';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, proceed with login
      console.log('Login Data:', loginData);
      // Add your login logic here (e.g., API call)
      alert('Login Successful!');
    } else {
      console.log('Form has errors');
    }
  };

  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  // Handle password reset
  const handlePasswordReset = (e) => {
    e.preventDefault();
    
    // Validate email for password reset
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required for password reset';
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (Object.keys(newErrors).length === 0) {
      console.log('Password reset requested for:', loginData.email);
      alert('Password reset link sent to your email!');
      setShowForgotPassword(false);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            {showForgotPassword ? 'Reset Password' : 'Student Login'}
          </h2>
        </div>
        
        <form 
          onSubmit={showForgotPassword ? handlePasswordReset : handleSubmit} 
          className="p-8 space-y-6"
        >
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input (hidden during forgot password) */}
          {!showForgotPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          )}

          {/* Forgot Password Help Text */}
          {showForgotPassword && (
            <p className="text-sm text-gray-600 mb-4">
              Enter your registered email to receive a password reset link.
            </p>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            {!showForgotPassword ? (
              <>
                <button
                  type="submit"
                  className="w-full px-12 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  Login
                </button>
                <div className="flex justify-between items-center">
                  <a 
                    href="#"
                    onClick={handleForgotPassword}
                    className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Forgot Password?
                  </a>
                  <a 
                    href="#"
                    className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="w-full px-12 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  Reset Password
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;