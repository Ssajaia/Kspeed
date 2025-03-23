import { Search, Notifications, Message, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { EmojiEvents } from "@mui/icons-material";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              {" "}
              <Link to="/Main" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-xl font-bold text-blue-600">
                  SocialApp
                </span>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Message className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Notifications className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Person className="text-gray-600" />
            </button>
          </div>

          <nav className="flex items-center space-x-4">
            <Link
              to="/leaderboards"
              className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <EmojiEvents className="mr-2" />
              Leaderboards
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
