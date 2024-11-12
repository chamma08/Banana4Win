import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/api/gameSession/leaderboard");
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);
  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            <span>
              {index + 1}. User: {entry._id}
            </span>
            <span>Score: {entry.maxScore}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
