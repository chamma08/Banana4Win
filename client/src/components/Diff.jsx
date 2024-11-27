import React from "react";
import { useNavigate } from "react-router-dom";

export default function Diff() {
  const navigate = useNavigate();

  const handleDifficulty = (level) => {
    navigate("/game", { state: { difficulty: level } });
  };
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/mn1.jpg?alt=media&token=aa65ae8e-c908-4dcc-9637-5480ade1276e')",
      }}
    >
      <div className="flex flex-col items-center p-6 bg-black bg-opacity-80 rounded-lg shadow-lg border-2 w-[30rem] h-[20rem] border-red-700">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-yellow-300">DIFFICULTY</span>
        </h1>
        <button
          onClick={() => handleDifficulty("Easy")}
          className="bg-yellow-300 hover:bg-yellow-400 text-black mt-4 font-bold py-2 px-4 rounded mb-6 w-32"
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
      <div className="absolute top-40 left-10 text-left text-lg border-yellow-400 border-2 rounded-xl p-4 bg-black bg-opacity-80">
        <p className="text-green-700 font-semibold">Easy - Time 60 s</p>
        <p className="text-yellow-600 font-semibold">Medium - Time 40 s</p>
        <p className="text-red-700 font-semibold">Hard - Time 20 s</p>
      </div>
    </div>
  );
}
