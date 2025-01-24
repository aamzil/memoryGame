import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  // state to store the background color
  const [background, setBackground] = useState("bg-blue-100");

  // get the settings from the local storage
  const settings = JSON.parse(
    localStorage.getItem("memoryGameSettings") ||
      '{"cardCount": 4, "background": "bg-blue-100"}'
  );

  // array of background colors
  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-yellow-100",
  ];

  // navigation hook
  const navigate = useNavigate();

  // function to save the settings
  const saveSettings = () => {
    localStorage.setItem(
      "memoryGameSettings",
      JSON.stringify({
        ...settings,
        background: background,
      })
    );
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen p-8 flex flex-col items-center justify-center ${background}`}
    >
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Background Color</h2>
          <div className="flex gap-4">
            {colors.map((bg) => (
              <button
                key={bg}
                className={`w-10 h-10 rounded-full ${bg} border-2 ${
                  background === bg ? "border-black" : "border-transparent"
                }`}
                onClick={() => setBackground(bg)}
              />
            ))}
          </div>
        </div>

        <button
          onClick={saveSettings}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default SettingsPage;
