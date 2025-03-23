import { useState, useEffect, useRef } from "react";
import { sentences } from "./data";
import Header from "./Header";
interface Player {
  id: string;
  username: string;
  completedSentences: number;
  totalSentences: number;
  averageWPM: number;
  averageAccuracy: number;
}

const TypingSpeedTest = () => {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  const getRandomSentence = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  };

  useEffect(() => {
    setText(getRandomSentence());
  }, []);

  useEffect(() => {
    let interval: number;
    if (isStarted && !isFinished) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished]);

  // Calculate WPM and accuracy
  useEffect(() => {
    if (isFinished) {
      const words = text.split(" ").length;
      const minutes = time / 60;
      const calculatedWpm = Math.round(words / minutes);
      setWpm(calculatedWpm);

      const correctChars = userInput
        .split("")
        .filter((char, index) => char === text[index]).length;
      const calculatedAccuracy = Math.round((correctChars / text.length) * 100);
      setAccuracy(calculatedAccuracy);
    }
  }, [isFinished, text, userInput, time]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (!isStarted) {
      setIsStarted(true);
    }

    if (value === text) {
      setIsFinished(true);
      updateLeaderboard();
    }
  };

  const updateLeaderboard = () => {
    const storedPlayers = localStorage.getItem("typingPlayers");
    const players = storedPlayers ? JSON.parse(storedPlayers) : [];

    // Get current player (you might want to add user authentication later)
    const currentPlayer = {
      id: "current-user", // Replace with actual user ID when you add authentication
      username: "Current User", // Replace with actual username
      completedSentences: 1,
      totalSentences: sentences.length,
      averageWPM: wpm,
      averageAccuracy: accuracy,
    };

    // Find if player already exists
    const existingPlayerIndex = players.findIndex(
      (p: Player) => p.id === currentPlayer.id
    );

    if (existingPlayerIndex !== -1) {
      // Update existing player
      players[existingPlayerIndex] = {
        ...players[existingPlayerIndex],
        completedSentences: players[existingPlayerIndex].completedSentences + 1,
        averageWPM: Math.round(
          (players[existingPlayerIndex].averageWPM + wpm) / 2
        ),
        averageAccuracy: Math.round(
          (players[existingPlayerIndex].averageAccuracy + accuracy) / 2
        ),
      };
    } else {
      // Add new player
      players.push(currentPlayer);
    }

    // Save to localStorage
    localStorage.setItem("typingPlayers", JSON.stringify(players));
  };

  const handleReset = () => {
    setText(getRandomSentence());
    setUserInput("");
    setTime(0);
    setIsStarted(false);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6 my-20">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Typing Speed Test
          </h2>

          {/* Text to type */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg leading-relaxed">
              {text.split("").map((char, index) => (
                <span
                  key={index}
                  className={
                    userInput[index] === undefined
                      ? "text-gray-400"
                      : userInput[index] === char
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {char}
                </span>
              ))}
            </p>
          </div>

          {/* Input field */}
          <div className="mb-6">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              disabled={isFinished}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start typing..."
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Time</p>
              <p className="text-xl font-semibold">{time}s</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">WPM</p>
              <p className="text-xl font-semibold">{wpm}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-xl font-semibold">{accuracy}%</p>
            </div>
          </div>

          {/* Reset button */}
          <div className="text-center">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isFinished ? "Try Again" : "Reset"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypingSpeedTest;
