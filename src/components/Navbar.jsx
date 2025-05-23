import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Q&A Platform
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/questions" className="hover:text-gray-300">Questions</Link>

          {authUser && (
            <>
              <Link to="/ask-question" className="hover:text-gray-300">Ask Question</Link>
              <Link to="/chats" className="hover:text-gray-300">Chats</Link>
            </>
          )}
        </div>

        {/* Auth Links */}
        <div className="flex items-center space-x-4">
          {authUser ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={`/avatars/${authUser.avatar}`}
                  alt={authUser.username}
                  className="w-8 h-8 rounded-full"
                />
                <span>{authUser.username}</span>
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/signup" className="bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700">
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
