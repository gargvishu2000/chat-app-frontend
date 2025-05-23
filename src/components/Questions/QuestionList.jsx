import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { FaRegThumbsUp, FaThumbsDown } from "react-icons/fa";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/questions`);
        setQuestions(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleVote = async (questionId, type) => {
    try {
      await axios.put(`${API_URL}/api/questions/${type}/${questionId}`);

      // Refresh the question list after voting
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === questionId
            ? {
              ...q,
              upvotes:
                type === "upvote"
                  ? [...q.upvotes, "newVote"]
                  : q.upvotes.filter((v) => v !== "newVote"),
              downvotes:
                type === "downvote"
                  ? [...q.downvotes, "newVote"]
                  : q.downvotes.filter((v) => v !== "newVote"),
            }
            : q
        )
      );
    } catch (err) {
      console.error("Error voting:", err);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center bg-red-100 text-red-600 p-4 rounded-md mt-4">
        {error}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center my-10">
        <h3 className="text-xl font-semibold">No questions yet</h3>
        <p className="text-gray-500">Be the first to ask a question!</p>
        <Link
          to="/ask-question"
          className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Ask a Question
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Community Questions</h2>
        <Link
          to="/ask-question"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          + Ask a Question
        </Link>
      </div>

      {questions.map((question) => (
        <div
          key={question._id}
          className="bg-white shadow-md rounded-lg p-5 mb-4 border border-gray-200"
        >
          <div className="flex justify-between">
            <h5 className="text-lg font-semibold">
              <Link
                to={`/questions/${question._id}`}
                className="text-blue-600 hover:underline"
              >
                {question.title}
              </Link>
            </h5>
            <span className="text-gray-500 text-sm">
              {new Date(question.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700 mt-2">
            {question.body.length > 200
              ? `${question.body.substring(0, 200)}...`
              : question.body}
          </p>

          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              {/* Upvote Button */}
              <button
                className="flex items-center text-green-600 hover:text-green-800 transition duration-200"
                onClick={() => handleVote(question._id, "upvote")}
              >
                <FaRegThumbsUp className="mr-1" /> {question.upvotes.length}
              </button>
              {/* Downvote Button */}
              <button
                className="flex items-center text-red-600 hover:text-red-800 transition duration-200"
                onClick={() => handleVote(question._id, "downvote")}
              >
                <FaThumbsDown className="mr-1" /> {question.downvotes.length}
              </button>
            </div>
          </div>


          <div className="flex items-center space-x-2">
            <img
              src={`/avatars/${question.author.avatar}`}
              alt=''
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-600 text-sm">
              {question.author.username}
            </span>
          </div>
          { question.tags.length > 0 && (
            <div className="mt-3">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium text-white bg-gray-600 rounded-md mr-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )
        }
        </div>
  ))
}
    </div >
  );
};

export default QuestionList;
