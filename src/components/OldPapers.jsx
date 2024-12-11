import React, { useState } from "react";
import { Upload, Download, FileText, Book, ArrowLeft } from "lucide-react";

const OldPapersComponent = () => {
  const loggedInUser = "John Doe"; // Replace with actual authentication logic

  const [uploadCourse, setUploadCourse] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [papers, setPapers] = useState([]);
  const [filterCourse, setFilterCourse] = useState("");

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

    if (uploadCourse && noteTitle && selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Please upload a valid PDF file.");
        return;
      }

      const newPaper = {
        course: uploadCourse,
        title: noteTitle,
        file: selectedFile,
        date: new Date().toLocaleString(),
        uploadedBy: loggedInUser,
      };

      setPapers([...papers, newPaper]);
      setUploadCourse("");
      setNoteTitle("");
      setSelectedFile(null);
      document.getElementById("fileInput").value = "";
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
    window.location.href = "/";
  };

  const handleDelete = (paperIndex) => {
    const paperToDelete = papers[paperIndex];
    if (paperToDelete.uploadedBy === loggedInUser) {
      const updatedPapers = papers.filter((_, index) => index !== paperIndex);
      setPapers(updatedPapers);
    } else {
      alert("You can only delete papers you uploaded.");
    }
  };

  // Filtered papers based on selected course
  const filteredPapers = papers.filter(
    (paper) => filterCourse === "" || paper.course === filterCourse
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-24 p-8 flex flex-col items-center relative">
      <h1 className="text-5xl font-bold mb-6 text-center text-indigo-800 px-4 py-2 rounded-lg z-10 relative">
        Upload Old Papers
      </h1>

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
        <div className="flex items-center bg-indigo-50 rounded-md p-3">
          <Book className="mr-3 text-indigo-500" />
          <select
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

        <div className="flex items-center bg-indigo-50 rounded-md p-3">
          <FileText className="mr-3 text-indigo-500" />
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Paper Title (e.g., Subject Name, Topic)"
            className="w-full bg-transparent focus:outline-none text-lg"
          />
        </div>

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
          Upload Paper
        </button>
      </form>

      {/* Filter Section */}
      <div className="w-full max-w-xl mb-8">
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

      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-800 flex items-center">
          <Download className="mr-2 text-indigo-600" size={32} />
          Uploaded Papers
        </h2>

        {filteredPapers.length > 0 ? (
          <ul className="space-y-4">
            {filteredPapers.map((paper, index) => (
              <li
                key={index}
                className="bg-white p-6 rounded-md flex justify-between items-center hover:bg-indigo-50 transition duration-300"
              >
                <div>
                  <p className="font-semibold text-indigo-700">{paper.title}</p>
                  <p className="text-sm text-gray-500">
                    Course: {paper.course} | Uploaded by: {paper.uploadedBy} | Uploaded on: {paper.date}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDownload(paper.file)}
                    className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 transition duration-300 flex items-center"
                  >
                    <Download className="mr-2" />
                    Download
                  </button>
                  {paper.uploadedBy === loggedInUser && (
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
            No papers uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default OldPapersComponent;
