import React from "react";
import { useNavigate } from "react-router-dom";

export default function Diff() {
  const navigate = useNavigate();

  const handleDifficulty = (level) => {
    navigate("/game", { state: { difficulty: level } });
  };
  return (
    <div
      className="flex justify-center items-center h-screen bg-yellow-100 bg-"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/funny-monkey-playing-basketball.jpg?alt=media&token=2cd4fbcd-36a7-4cae-b244-95f7c9d4911c')",
      }}
    >
      <div
        className="flex flex-col items-center p-6 rounded-lg shadow-lg border-2 w-[30rem] h-[20rem] border-red-700"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <div className="mb-10 bg-orange-500 px-4 py-2 rounded-lg text-white font-bold text-lg">
          Difficulty
        </div>
        <button
          onClick={() => handleDifficulty("Easy")}
          className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded mb-6 w-32"
        >
          Easy
        </button>
        <button
          onClick={() => handleDifficulty("Medium")}
          className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded mb-6 w-32"
        >
          Medium
        </button>
        <button
          onClick={() => handleDifficulty("Hard")}
          className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded w-32"
        >
          Hard
        </button>
      </div>
      <div className="absolute top-40 left-10 text-left text-lg border-yellow-400 border-2 rounded-xl p-4 bg-slate-200">
        <p className="text-green-700">Easy - Time 60 s</p>
        <p className="text-yellow-600">Medium - Time 40 s</p>
        <p className="text-red-700">Hard - Time 20 s</p>
      </div>
    </div>
  );
}
