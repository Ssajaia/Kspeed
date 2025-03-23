import { useState, useEffect } from "react";
import { EmojiEvents, Person } from "@mui/icons-material";
import Header from "./Header";

interface Player {
  id: string;
  username: string;
  completedSentences: number;
  totalSentences: number;
  averageWPM: number;
  averageAccuracy: number;
}

const Leaderboards = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get players from localStorage
    const storedPlayers = localStorage.getItem("typingPlayers");
    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers);
      // Sort by completed sentences (descending)
      const sortedPlayers = parsedPlayers.sort(
        (a: Player, b: Player) => b.completedSentences - a.completedSentences
      );
      setPlayers(sortedPlayers);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <p className="text-gray-500">
            No players yet. Complete some typing tests to see the leaderboard!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Leaderboard</h2>

          <div className="space-y-4">
            {players.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center p-4 rounded-lg ${
                  index === 0
                    ? "bg-yellow-50 border-2 border-yellow-400"
                    : index === 1
                    ? "bg-gray-50 border-2 border-gray-300"
                    : index === 2
                    ? "bg-amber-50 border-2 border-amber-600"
                    : "bg-white border border-gray-200"
                }`}
              >
                {/* Rank */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mr-4">
                  {index === 0 ? (
                    <EmojiEvents className="text-yellow-500 text-2xl" />
                  ) : (
                    <span className="text-xl font-bold text-gray-600">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Player Info */}
                <div className="flex-1">
                  <div className="flex items-center">
                    <Person className="text-gray-500 mr-2" />
                    <span className="font-semibold text-lg">
                      {player.username}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Completed {player.completedSentences} of{" "}
                    {player.totalSentences} sentences
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <div className="font-semibold text-blue-600">
                    {player.averageWPM} WPM
                  </div>
                  <div className="text-sm text-gray-500">
                    {player.averageAccuracy}% accuracy
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboards;
