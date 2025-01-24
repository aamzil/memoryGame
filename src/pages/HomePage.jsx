import { Link } from "react-router-dom";

const HomePage = () => {
  // get the settings from the local storage
  const settings = JSON.parse(
    localStorage.getItem("memoryGameSettings") ||
      '{"cardCount": 4, "background": "bg-blue-100"}'
  );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${settings.background}`}
    >
      <h1 className="text-7xl text-blue-500">Memory Game</h1>
      <p className="mt-4">Ayoub Amzil</p>
      <nav className="space-y-2 mt-14">
        <Link
          to="/cards"
          className="shadow block text-center px-28 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Start
        </Link>

        <Link
          to="/settings"
          className="shadow block text-center px-28 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Settings
        </Link>

        <Link
          to="/history"
          className="shadow block text-center px-28 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          History
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
