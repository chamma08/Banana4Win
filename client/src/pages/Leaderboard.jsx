import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/api/scores/leaderboard");
        setLeaderboard(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return ( 
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-500 to-pink-500 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/mn2.jpg?alt=media&token=e971155c-0329-4dc1-9601-854608b15f98')",
    }}>
      
      <div className="relative w-[28rem] h-[35rem] p-4 bg-black bg-opacity-50 rounded-2xl shadow-lg border-4 border-yellow-400 mb-10">
        <div className="flex justify-center items-center bg-pink-500 text-white font-bold text-2xl px-6 py-2 rounded-t-lg">
          <span className="uppercase">Leaderboard</span>
        </div>
        {loading ? (
          <p className="text-center mt-6 text-lg font-bold text-gray-700">
            Loading...
          </p>
        ) : (
          <div className="p-4">
            {leaderboard.map((entry, index) => (
              <div
                key={entry._id}
                className={`flex items-center justify-between px-4 py-2 mb-2 rounded-lg ${
                  index === 0
                    ? "bg-yellow-300"
                    : index === 1
                    ? "bg-gray-300"
                    : index === 2
                    ? "bg-orange-300"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold">{index + 1}</span>
                  {/* <img
                    src={`/trophy${index + 1}.png`}
                    alt="Rank Icon"
                    className="w-8 h-8"
                  /> */}
                  <span className="font-bold text-gray-700">
                    {entry.username}
                  </span>
                </div>
                <span className="font-bold text-yellow-600">
                  {entry.score.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleBack}
          className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-red-500 text-white font-bold px-6 py-2 rounded-lg shadow-md"
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  );
}
