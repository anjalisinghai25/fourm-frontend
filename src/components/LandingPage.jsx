
import React, { useState } from "react";
import { MessageSquare, FileText, BookOpen, Archive } from "lucide-react";
import AnimatedWelcome from "./AnimatedWelcome";
import NotesPage from "./NotesPage";
import DiscussionFeed from "./DiscussionFeed"; // Import the DiscussionFeed component
import OldPapers from "./OldPapers"; // Import OldPapers
import Syllabus from "./Syllabus"; // Import the Syllabus component

const LandingPage = ({ isLoggedIn, username, handleLogin }) => {
  const [currentView, setCurrentView] = useState("main");

  const items = [
    { icon: MessageSquare, text: "Discussions", color: "bg-blue-500" },
    { icon: FileText, text: "Notes", color: "bg-green-500" },
    { icon: BookOpen, text: "Syllabus", color: "bg-yellow-500" },
    { icon: Archive, text: "Old Papers", color: "bg-purple-500" },
  ];

  const handleItemClick = (text) => {
    if (text === "Notes") {
      setCurrentView("notes");
    } else if (text === "Discussions") {
      setCurrentView("discussions"); // Navigate to Discussions
    } else if (text === "Old Papers") {
      setCurrentView("oldPapers"); // Navigate to Old Papers
    } else if (text === "Syllabus") {
      setCurrentView("syllabus"); // Navigate to syllabus
    }
  };

  // Function to handle SGSITS Main Site button click
  const handleSGSITSClick = () => {
    window.open("https://www.sgsits.ac.in/", "_blank");
  };

  if (currentView === "notes") {
    return <NotesPage onBack={() => setCurrentView("main")} />;
  }

  if (currentView === "discussions") {
    return <DiscussionFeed onBack={() => setCurrentView("main")} />; // Pass onBack here
  }

  if (currentView === "oldPapers") {
    return <OldPapers onBack={() => setCurrentView("main")} />; // Navigate to OldPapers
  }

  if (currentView === "syllabus") {
    return <Syllabus onBack={() => setCurrentView("main")} />; // Navigate to syllabus
  }

  return (
    <main className="container mx-auto mt-16 px-4">
      <AnimatedWelcome
        text={isLoggedIn ? `Welcome, ${username}!` : "Welcome to ForumPro!"}
      />

      <p className="text-2xl text-center text-gray-600 mb-12">
        How can we assist you today?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item.text)}
            className={`${item.color} text-white p-8 rounded-xl shadow-lg hover:shadow-xl 
            transition duration-300 transform hover:translate-y-1 flex flex-col items-center 
            justify-center`}
          >
            <item.icon size={48} className="mb-4" />
            <span className="text-xl font-semibold">{item.text}</span>
          </button>
        ))}

        {/* Add SGSITS Main Site button */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center mt-8">
          <button
            onClick={handleSGSITSClick}
            className="bg-slate-500 text-white p-8 rounded-xl shadow-lg hover:shadow-xl 
            transition duration-300 transform hover:translate-y-1 flex flex-col items-center justify-center"
          >
            <span className="text-xl font-semibold">SGSITS Main Site</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
