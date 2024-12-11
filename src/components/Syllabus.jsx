import React, { useState } from "react";
import { Upload, Download, FileText, Book, ArrowLeft } from "lucide-react";

const SyllabusComponent = () => {
  // Sample logged-in user for demonstration (replace with actual authentication logic)
  const loggedInUser = "John Doe"; // This will be dynamically set based on the logged-in user

  const [uploadCourse, setUploadCourse] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [syllabus, setSyllabus] = useState([]);
  const [filterCourse, setFilterCourse] = useState(""); // Added state for filter

  const courses = {
    "B-Pharma": 6,
    "BE/B-Tech": 8,
    MBA: 4,
    MCA: 4,
    "M-Pharma": 4,
    "ME/M-Tech": 4,
    MSc: 4,
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (uploadCourse && selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Please upload a valid PDF file.");
        return;
      }

      const newSyllabus = {
        course: uploadCourse,
        file: selectedFile,
        date: new Date().toLocaleString(),
        uploadedBy: loggedInUser, // Automatically use the logged-in user's name
      };

      setSyllabus([...syllabus, newSyllabus]);
      setUploadCourse(""); // Clear the selected course
      setSelectedFile(null); // Clear the selected file
      document.getElementById("fileInput").value = ""; // Clear the file input field
      document.getElementById("courseSelect").value = ""; // Clear the course dropdown selection
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBack = () => {
    // Navigate to the landing page
    window.location.href = "/"; // Change '/' to the appropriate landing page URL
  };

  const handleDelete = (syllabusIndex) => {
    const syllabusToDelete = syllabus[syllabusIndex];
    // Check if the logged-in user is the uploader of this syllabus
    if (syllabusToDelete.uploadedBy === loggedInUser) {
      const updatedSyllabus = syllabus.filter((_, index) => index !== syllabusIndex);
      setSyllabus(updatedSyllabus);
    } else {
      alert("You can only delete syllabus you uploaded.");
    }
  };

  // Filter syllabus based on selected course
  const filteredSyllabus = filterCourse
    ? syllabus.filter((item) => item.course === filterCourse)
    : syllabus;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex flex-col items-center relative pt-24">
      <h1 className="text-5xl font-bold mb-6 text-center text-indigo-800 px-4 py-2 rounded-lg">
        Upload Syllabus
      </h1>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-20 right-6 bg-transparent text-gray-600 px-4 py-2 rounded-full flex items-center transition duration-300 border border-gray-400 hover:bg-gray-200"
      >
        <ArrowLeft className="mr-2" />
        Back
      </button>

      <form
        onSubmit={handleUpload}
        className="w-full max-w-xl space-y-6 mb-10 p-8 bg-white rounded-xl"
      >
        {/* Course Selection */}
        <div className="flex items-center bg-indigo-50 rounded-md p-3">
          <Book className="mr-3 text-indigo-500" />
          <select
            id="courseSelect"
            value={uploadCourse}
            onChange={(e) => setUploadCourse(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-lg"
          >
            <option value="">Select Course</option>
            {Object.keys(courses).map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div className="flex items-center bg-indigo-50 rounded-md p-3">
          <input
            id="fileInput"
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            accept=".pdf"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
        >
          <Upload className="mr-2" />
          Upload Syllabus
        </button>
      </form>

      {/* Course Filter for Uploaded Syllabus */}
      <div className="w-full max-w-xl mb-6">
        <div className="flex items-center bg-indigo-50 rounded-md p-3">
          <Book className="mr-3 text-indigo-500" />
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-lg"
          >
            <option value="">Select Course for Easy Search</option>
            {Object.keys(courses).map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Uploaded Syllabus */}
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-800 flex items-center">
          <Download className="mr-2 text-indigo-600" size={32} />
          Uploaded Syllabus
        </h2>

        {filteredSyllabus.length > 0 ? (
          <ul className="space-y-4">
            {filteredSyllabus.map((item, index) => (
              <li
                key={index}
                className="bg-white p-6 rounded-md flex justify-between items-center hover:bg-indigo-50 transition duration-300"
              >
                <div>
                  <p className="font-semibold text-indigo-700">Course: {item.course}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded by: {item.uploadedBy} | Uploaded on: {item.date}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDownload(item.file)}
                    className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 transition duration-300 flex items-center"
                  >
                    <Download className="mr-2" />
                    Download
                  </button>
                  {item.uploadedBy === loggedInUser && (
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 italic">
            No syllabus uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SyllabusComponent;
