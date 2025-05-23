import { Link } from "react-router-dom";

const HomePage = () => {
    console.log("Calling all autobots");
    
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Welcome to Q&A Platform
      </h1>

      {/* Subtext */}
      <p className="text-lg text-gray-700 max-w-2xl">
        Ask questions, get answers, and connect with other users through our platform.
      </p>

      {/* Divider */}
      <div className="w-24 border-t-2 border-gray-300 my-6"></div>

      <p className="text-gray-600">
        Join our community to share knowledge and engage in meaningful discussions.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <Link
          to="/questions"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Browse Questions
        </Link>
        <Link
          to="/signup"
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
        >
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
