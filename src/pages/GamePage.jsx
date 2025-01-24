import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setmatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [gameTime, setGameTime] = useState(0);
  const [param, ShowParam] = useState(false);

  // array of background colors
  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-yellow-100",
  ];

  // navigation hook
  const navigate = useNavigate();

  // get the settings from the local storage
  const settings = JSON.parse(
    localStorage.getItem("memoryGameSettings") ||
      '{"cardCount": 4, "background": "bg-blue-100"}'
  );

  // function to save the settings
  const setLocalStorage = (bg) => {
    localStorage.setItem(
      "memoryGameSettings",
      JSON.stringify({
        ...settings,
        background: bg,
      })
    );
  };

  // function to generate the cards
  const generateCards = () => {
    const cardSymbols = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
    ];

    // select the symbols for the cards
    const selectedSymbols = cardSymbols.slice(0, settings.cardCount / 2);

    // create pairs of cards
    const cardPairs = [...selectedSymbols, ...selectedSymbols];

    // shuffle the cards
    return cardPairs
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
  };

  // initialize the cards
  useEffect(() => {
    setCards(generateCards());
    setStartTime(Date.now());
  }, []);

  // update the game time
  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime) {
        setGameTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleCardClick = (clickedCard) => {
    // check if the card is already flipped
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(clickedCard.id) ||
      matchedCards.includes(clickedCard.id)
    ) {
      return;
    }

    // flip the card
    const newFlippedCards = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    // check if the flipped cards are a match
    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards.map((id) =>
        cards.find((card) => card.id === id)
      );

      if (firstCard.symbol === secondCard.symbol) {
        setmatchedCards([...matchedCards, ...newFlippedCards]);
        setFlippedCards([]);

        // check if all the pairs are matched
        if (matchedCards.length + 2 === cards.length) {
          const gameData = {
            time: gameTime,
            cardCount: settings.cardCount,
            date: Date.now(),
          };

          const history = JSON.parse(
            localStorage.getItem("memoryGameHistory") || "[]"
          );
          localStorage.setItem(
            "memoryGameHistory",
            JSON.stringify([gameData, ...history])
          );

          setTimeout(() => navigate("/history"), 1000);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className={`min-h-screen ${settings.background} p-8`}>
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow rounded-xl p-5 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                Time: <span className="font-semibold">{gameTime}</span> seconds
              </p>
              <p className="text-gray-600">
                Moves: <span className="font-semibold">{moves}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => ShowParam(!param)}
                className="bg-blue-500 px-5 py-2 rounded-md text-white hover:bg-blue-600"
              >
                Settings
              </button>

              <button
                onClick={() => navigate("/")}
                className="bg-red-500 px-5 py-2 rounded-md text-white hover:bg-red-600"
              >
                End Game
              </button>
            </div>
          </div>

          {/* settings */}
          <div className={`pt-8 ${param ? "block" : "hidden"}`}>
            <h1 className="font-bold">Background color:</h1>
            <div className="mt-4 flex gap-4">
              {colors.map((bg) => (
                <button
                  key={bg}
                  className={`w-12 h-12 rounded-full ${bg} border-2 ${
                    settings.background === bg
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  onClick={() => {
                    setLocalStorage(bg);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* game */}
        <div
          className={`grid gap-4 ${
            settings.cardCount === 4
              ? "grid-cols-2"
              : settings.cardCount === 16
              ? "grid-cols-4"
              : "grid-cols-8"
          }`}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`aspect-square cursor-pointer ${
                flippedCards.includes(card.id) || matchedCards.includes(card.id)
                  ? "rotate-y-180"
                  : ""
              }`}
              onClick={() => handleCardClick(card)}
            >
              <div className="relative w-full h-full transition-transform duration-300 transform-style-preserve-3d">
                <div className="absolute w-full h-full bg-white rounded-lg shadow flex items-center justify-center text-3xl">
                  {flippedCards.includes(card.id) ||
                  matchedCards.includes(card.id)
                    ? card.symbol
                    : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
