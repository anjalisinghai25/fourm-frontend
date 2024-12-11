import React, { useState, useRef } from "react";
import {
  Upload,
  Download,
  FileText,
  Book,
  ArrowLeft,
  Trash,
} from "lucide-react";

const NotesPage = () => {
  const [uploadCourse, setUploadCourse] = useState("");
  const [uploadSemester, setUploadSemester] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({ id: "user1", name: "John Doe" }); // Example user
  const [downloadCourse, setDownloadCourse] = useState("");
  const [downloadSemester, setDownloadSemester] = useState("");
  
  // Reference to the file input
  const fileInputRef = useRef(null);

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

    // Check if all fields are filled
    if (!uploadCourse || !uploadSemester || !noteTitle || !selectedFile) {
      alert("All fields are required!");
      return; // Prevent form submission if any field is missing
    }

    // If all fields are filled, proceed with the upload
    const newNote = {
      course: uploadCourse,
      semester: uploadSemester,
      title: noteTitle,
      file: selectedFile,
      uploadedBy: user.id, // Store the user ID of the uploader
    };
    setNotes([...notes, newNote]);

    // Clear the fields after upload
    setUploadCourse("");
    setUploadSemester("");
    setNoteTitle("");
    setSelectedFile(null); // This will clear the state

    // Reset the file input field
    fileInputRef.current.value = "";
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

  const handleDelete = (index) => {
    if (notes[index].uploadedBy === user.id) {
      setNotes(notes.filter((_, i) => i !== index)); // Only the uploader can delete the note
    } else {
      alert("You can only delete your own notes.");
    }
  };

  const filteredNotes =
    downloadCourse && downloadSemester
      ? notes.filter(
          (note) =>
            note.course === downloadCourse && note.semester === downloadSemester
        )
      : notes;

  const handleBack = () => {
    // Navigate to the landing page
    window.location.href = "/"; // Change '/' to the appropriate landing page URL
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8 pt-16 flex flex-col items-center relative">
      <h1 className="text-5xl font-bold mb-4 text-center text-indigo-700">
        Upload Notes
      </h1>

      {/* Updated Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-20 right-6 bg-transparent text-gray-600 px-4 py-2 rounded-full flex items-center transition duration-300 border border-gray-400 hover:bg-gray-200"
      >
        <ArrowLeft className="mr-2" />
        Back
      </button>

      {/* Form for Upload */}
      <form onSubmit={handleUpload} className="w-full max-w-xl space-y-4 mb-8">
        <div className="flex items-center bg-white rounded-md p-3 shadow-md">
          <Book className="mr-2 text-indigo-500" />
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

        {uploadCourse && (
          <div className="flex items-center bg-white rounded-md p-3 shadow-md">
            <Book className="mr-2 text-indigo-500" />
            <select
              value={uploadSemester}
              onChange={(e) => setUploadSemester(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-lg"
            >
              <option value="">Select Semester</option>
              {Array.from(
                { length: courses[uploadCourse] },
                (_, i) => i + 1
              ).map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center bg-white rounded-md p-3 shadow-md">
          <FileText className="mr-2 text-indigo-500" />
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Note Title (e.g., Subject Name, Topic, Unit)"
            className="w-full bg-transparent focus:outline-none text-lg"
          />
        </div>

        <div className="flex items-center bg-white rounded-md p-3 shadow-md">
          <input
            type="file"
            ref={fileInputRef} // Attach the reference to the file input
            onChange={(e) => setSelectedFile(e.target.files[0])}
            accept=".pdf,.png"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
        >
          <Upload className="mr-2" />
          Upload Note
        </button>
      </form>

      {/* Filter Section */}
      <div className="w-full max-w-xl mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-indigo-800 flex items-center">
          <Download className="mr-2 text-indigo-600" size={32} />
          Download Notes
        </h2>

        <div className="flex items-center bg-white rounded-md p-3 shadow-md mb-4">
          <Book className="mr-2 text-indigo-500" />
          <select
            value={downloadCourse}
            onChange={(e) => setDownloadCourse(e.target.value)}
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

        {downloadCourse && (
          <div className="flex items-center bg-white rounded-md p-3 shadow-md mb-4">
            <Book className="mr-2 text-indigo-500" />
            <select
              value={downloadSemester}
              onChange={(e) => setDownloadSemester(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-lg"
            >
              <option value="">Select Semester</option>
              {Array.from(
                { length: courses[downloadCourse] },
                (_, i) => i + 1
              ).map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Display Uploaded Notes */}
      <div className="w-full max-w-xl mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-indigo-800">
          Uploaded Notes
        </h2>
        {notes.length > 0 ? (
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-md flex justify-between items-center shadow-md hover:bg-gray-100 transition duration-300"
              >
                <span className="font-semibold text-gray-800">
                  {note.title} (Course: {note.course}, Semester: {note.semester}
                  )
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDownload(note.file)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 flex items-center mr-2"
                  >
                    <Download className="mr-2" />
                    Download
                  </button>
                  {note.uploadedBy === user.id && (
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
                    >
                      <Trash className="mr-2" />
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 italic">No uploaded notes.</p>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
