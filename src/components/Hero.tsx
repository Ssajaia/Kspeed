import { Group, TrendingUp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="pt-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Test your typing speed
            </h1>
            <p className="text-xl text-blue-100">
              Join our growing community of millions of users who share,
              connect, and engage with content that matters.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/game"
                className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Play Now
              </Link>
              <Link
                to="/leaderboards"
                className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                View Leaderboard
              </Link>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Group className="text-2xl" />
                <div>
                  <h3 className="text-2xl font-bold">500K+</h3>
                  <p className="text-blue-100">Communities</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <TrendingUp className="text-2xl" />
                <div>
                  <h3 className="text-2xl font-bold">1M+</h3>
                  <p className="text-blue-100">Daily Plays</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
