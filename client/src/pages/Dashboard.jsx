import DashProfile from "@/components/DashProfile";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-200">
        <div className="p-8 bg-yellow-100 rounded-lg border-4 border-red-500 shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src="" 
            alt="User Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded mb-4 hover:bg-yellow-300">
            Start Game
          </button>
          <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded mb-4 hover:bg-yellow-300">
            Leaderboard
          </button>
          <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300">
            Log out
          </button>
        </div>
      </div>
      
    </div>
    
    
  );
}
