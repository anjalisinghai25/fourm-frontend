import React, { useState } from 'react';

const RegistrationForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    course: '',
    collegeName: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Courses list
  const courseOptions = [
    'Computer Science',
    'Information Technology',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Data Science',
    'Artificial Intelligence'
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Mobile number validation
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number';
    }

    // Course validation
    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    // College name validation
    if (!formData.collegeName.trim()) {
      newErrors.collegeName = 'College name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log('Registration Data:', formData);
      // Add your registration logic here (e.g., API call)
      alert('Registration Successful!');
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Student Registration</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
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
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
                }`}
                placeholder="Create a strong password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Mobile Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.mobileNumber 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
                }`}
                placeholder="10-digit mobile number"
                maxLength="10"
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Course
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.course 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
                }`}
              >
                <option value="">Select Your Course</option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="text-red-500 text-xs mt-1">{errors.course}</p>
              )}
            </div>

            {/* College Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.collegeName 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
                }`}
                placeholder="Enter your college name"
              />
              {errors.collegeName && (
                <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;