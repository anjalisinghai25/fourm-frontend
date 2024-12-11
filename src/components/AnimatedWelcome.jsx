import React, { useState, useEffect } from 'react';

const AnimatedWelcome = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <h1 className="text-5xl font-bold text-center text-gray-800 mb-6 h-20">
      {displayText}
    </h1>
  );
};

export default AnimatedWelcome;
