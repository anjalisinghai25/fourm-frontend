// src/App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername("John Doe"); // Set username on login (can be dynamic)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(""); // Reset username on logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans overflow-hidden">
      <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
      <LandingPage isLoggedIn={isLoggedIn} username={username} />
    </div>
  );
};

export default App;


