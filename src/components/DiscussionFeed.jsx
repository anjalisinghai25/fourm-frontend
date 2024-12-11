import React, { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Clock,
  Send,
  ThumbsDown,
} from "lucide-react";

// Mock data for initial discussions
const INITIAL_DISCUSSIONS = [
  {
    id: 1,
    user: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    content:
      "Just finished my first React project! It's been an amazing journey learning all about components, state, and props. Can't wait to dive deeper into more advanced topics!",
    mediaType: "image",
    mediaUrl:
      "https://via.placeholder.com/500x300?text=React+Project+Screenshot",
    timestamp: "2024-10-13T10:30:00Z",
    likes: 15,
    dislikes: 0,
    likedByCurrentUser: false,
    dislikedByCurrentUser: false,
    comments: [],
  },
  // Add more initial discussions as needed
];

const DiscussionFeed = ({ onBack }) => {
  const [discussions, setDiscussions] = useState(INITIAL_DISCUSSIONS);
  const [newPost, setNewPost] = useState({ text: "", media: null });
  const [newComments, setNewComments] = useState({});

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newDiscussion = {
      id: discussions.length + 1,
      user: "Current User", // Replace with actual current user data
      avatar: "https://i.pravatar.cc/150?img=8", // Replace with actual user avatar
      content: newPost.text,
      mediaType: newPost.media
        ? newPost.media.type.startsWith("image")
          ? "image"
          : "video"
        : null,
      mediaUrl: newPost.media ? URL.createObjectURL(newPost.media) : null,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      likedByCurrentUser: false,
      dislikedByCurrentUser: false,
      comments: [],
    };
    console.log(newDiscussion);
    setDiscussions([newDiscussion, ...discussions]);
    setNewPost({ text: "", media: null });
  };

  const handleLike = (id) => {
    setDiscussions(
      discussions.map((disc) =>
        disc.id === id
          ? {
              ...disc,
              likes: disc.likedByCurrentUser ? disc.likes - 1 : disc.likes + 1,
              dislikedByCurrentUser: false, // Reset dislike if liked
              likedByCurrentUser: !disc.likedByCurrentUser,
            }
          : disc
      )
    );
  };

  const handleDislike = (id) => {
    setDiscussions(
      discussions.map((disc) =>
        disc.id === id
          ? {
              ...disc,
              dislikes: disc.dislikedByCurrentUser
                ? disc.dislikes - 1
                : disc.dislikes + 1,
              likedByCurrentUser: false, // Reset like if disliked
              dislikedByCurrentUser: !disc.dislikedByCurrentUser,
            }
          : disc
      )
    );
  };

  const handleCommentSubmit = (discussionId) => {
    const commentText = newComments[discussionId];
    if (commentText) {
      setDiscussions(
        discussions.map((disc) =>
          disc.id === discussionId
            ? {
                ...disc,
                comments: [
                  ...disc.comments,
                  {
                    id: Date.now(),
                    user: "Current User", // Replace with actual current user data
                    content: commentText,
                    timestamp: new Date().toISOString(), // Add timestamp for the comment
                  },
                ],
              }
            : disc
        )
      );
      setNewComments({ ...newComments, [discussionId]: "" });
    }
  };

  const handleDeleteComment = (discussionId, commentId) => {
    setDiscussions(
      discussions.map((disc) =>
        disc.id === discussionId
          ? {
              ...disc,
              comments: disc.comments.filter(
                (comment) => comment.id !== commentId
              ),
            }
          : disc
      )
    );
  };

  const handleDeleteDiscussion = (id) => {
    setDiscussions(discussions.filter((disc) => disc.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen rounded-lg shadow-lg pt-24">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-800">
        ForumPro Discussions
      </h1>

      {/* Back Button */}
      <div className="text-center mb-4">
        <button
          onClick={onBack} // Call the onBack function passed from LandingPage
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
        >
          Back
        </button>
      </div>

      {/* New post form */}
      <div className="mb-8 shadow-md rounded-lg overflow-hidden">
        <h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold p-4">
          Start a New Discussion
        </h2>
        <div className="p-4">
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <textarea
              placeholder="What's on your mind?"
              value={newPost.text}
              onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) =>
                  setNewPost({ ...newPost, media: e.target.files[0] })
                }
                className="flex-grow border border-gray-300 rounded-lg p-2 transition duration-300"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Continuous Discussion feed */}
      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          className="mb-6 shadow-md rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 flex items-center">
            <img
              src={discussion.avatar}
              alt={discussion.user}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold text-indigo-800">
                {discussion.user}
              </h3>
              <p className="text-sm text-gray-600">
                <Clock className="inline mr-1" size={14} />
                {new Date(discussion.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDeleteDiscussion(discussion.id)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-800 mb-4">{discussion.content}</p>
            {discussion.mediaType === "image" && (
              <img
                src={discussion.mediaUrl}
                alt="Post media"
                className="w-full rounded-lg shadow-md"
              />
            )}
            {discussion.mediaType === "video" && (
              <div className="relative pt-56.25%">
                <video
                  src={discussion.mediaUrl}
                  controls
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
          <div className="bg-gray-50 p-4 flex flex-col">
            <div className="flex justify-between w-full mb-4">
              <button
                onClick={() => handleLike(discussion.id)}
                className={`text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 px-4 py-2 rounded-full shadow-md transition duration-300 ${
                  discussion.likedByCurrentUser ? "bg-indigo-200" : ""
                }`}
              >
                <ThumbsUp
                  className="mr-2"
                  size={18}
                  fill={discussion.likedByCurrentUser ? "currentColor" : "none"}
                />
                {discussion.likes}
              </button>
              <button
                onClick={() => handleDislike(discussion.id)}
                className={`text-red-600 hover:text-red-800 hover:bg-red-100 px-4 py-2 rounded-full shadow-md transition duration-300 ${
                  discussion.dislikedByCurrentUser ? "bg-red-200" : ""
                }`}
              >
                <ThumbsDown
                  className="mr-2"
                  size={18}
                  fill={
                    discussion.dislikedByCurrentUser ? "currentColor" : "none"
                  }
                />
                {discussion.dislikes}
              </button>
            </div>

            {/* Comments section */}
            <div className="space-y-4">
              <div className="mb-4">
                <textarea
                  value={newComments[discussion.id] || ""}
                  onChange={(e) =>
                    setNewComments({
                      ...newComments,
                      [discussion.id]: e.target.value,
                    })
                  }
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
                <button
                  onClick={() => handleCommentSubmit(discussion.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md mt-2"
                >
                  Comment
                </button>
              </div>
              <div className="space-y-2">
                {discussion.comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-white shadow-sm rounded-lg">
                    <div className="flex justify-between">
                      <div className="text-sm font-semibold text-indigo-700">
                        {comment.user}
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteComment(discussion.id, comment.id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                    <p className="text-xs text-gray-400">
                      <Clock className="inline mr-1" size={14} />
                      {new Date(comment.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscussionFeed;
