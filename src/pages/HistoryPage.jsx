import React from "react";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  // navigation hook
  const navigate = useNavigate();

  // get the game history from the local storage
  const gameHistory = JSON.parse(
    localStorage.getItem("memoryGameHistory") || "[]"
  );

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Game History</h1>

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center my-8 gap-y-2">
          <button
            className="bg-red-500 px-5 py-2 rounded-md text-white hover:bg-red-600"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

          <button
            className="bg-blue-500 px-5 py-2 rounded-md text-white hover:bg-blue-600"
            onClick={() => navigate("/cards")}
          >
            New Game
          </button>
        </div>

        <div className="space-y-4">
          {gameHistory.map((game, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Time: {game.time} seconds</p>
                  <p className="text-gray-600">Cards: {game.cardCount}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(game.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
