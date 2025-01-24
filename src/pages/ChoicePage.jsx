import React from "react";
import { useNavigate } from "react-router-dom";

const ChoicePage = () => {
  // get the settings from the local storage
  const settings = JSON.parse(
    localStorage.getItem("memoryGameSettings") ||
      '{"cardCount": 4, "background": "bg-blue-100"}'
  );

  // function to handle the card count selection
  const handleCardCountSelect = (count) => {
    localStorage.setItem(
      "memoryGameSettings",
      JSON.stringify({
        ...settings,
        cardCount: count,
      })
    );
    navigate("/game");
  };

  // array of card numbers
  const cardNumber = [4, 16, 32];

  // navigation hook
  const navigate = useNavigate();
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${settings.background}`}
    >
      <div className="max-w-xl w-full">
        <h2 className="text-4xl font-bold text-center mb-8">
          Choose the number of Cards
        </h2>
        <div className="flex justify-center gap-4">
          {cardNumber.map((count) => (
            <button
              key={count}
              onClick={() => handleCardCountSelect(count)}
              className="shadow py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {count} Cards
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoicePage;
