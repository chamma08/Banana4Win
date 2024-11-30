import { signoutSuccess } from "@/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSpecialModeAvailable, setIsSpecialModeAvailable] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const lastActivation = localStorage.getItem("specialModeLastActivated");
    if (lastActivation) {
      const lastActivationDate = new Date(lastActivation);
      const now = new Date();
      const timeDifference = now - lastActivationDate;

      
      const remainingTime = 86400000 - timeDifference; 

      if (remainingTime > 0) {
        setIsSpecialModeAvailable(false);

        
        const interval = setInterval(() => {
          const now = new Date();
          const timeLeft = Math.max(0, 86400000 - (now - lastActivationDate));

          if (timeLeft <= 0) {
            setCountdown("");
            setIsSpecialModeAvailable(true);
            clearInterval(interval);
          } else {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            setCountdown(`${hours}h ${minutes}m ${seconds}s`);
          }
        }, 1000);

        return () => clearInterval(interval); 
      } else {
        setIsSpecialModeAvailable(true);
      }
    } else {
      setIsSpecialModeAvailable(true);
    }
  }, []);

  const handleSpecialMode = () => {
    localStorage.setItem("specialModeLastActivated", new Date().toISOString());
    setIsSpecialModeAvailable(false);
    setCountdown("23h 59m 59s"); 
    navigate("/special-mode");
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStartGame = () => {
    navigate("/difficulty");
  };

  const handleLeaderboard = () => {
    navigate("/leaderboard");
  };

  const profile = () => {
    navigate("/profile");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/mn.jpg?alt=media&token=71a2be8f-f9ab-4a2c-9327-32f3494b3d68')",
      }}
    >
      <div className="w-[400px] p-6 rounded-lg bg-opacity-80 bg-black text-white shadow-lg border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-yellow-500">B</span>ANANA{" "}
          <span className="text-yellow-500">4</span>WIN
        </h1>
        <ul className="flex flex-col gap-4">
          <li>
            <button
              onClick={handleStartGame}
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-lg font-bold rounded"
            >
              New Game
            </button>
          </li>
          <li>
            <button
              onClick={handleLeaderboard}
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-lg font-bold rounded"
            >
              Leaderboard
            </button>
          </li>
          <li>
            <button
              onClick={handleSpecialMode}
              disabled={!isSpecialModeAvailable}
              className={`w-full py-2 ${
                isSpecialModeAvailable
                  ? "bg-yellow-400 hover:bg-yellow-500"
                  : "bg-yellow-500 cursor-not-allowed"
              } text-lg font-bold rounded relative`}
            >
              Special Mode
              {!isSpecialModeAvailable && (
                <span className="absolute top-2 right-2 text-xs text-red-900">
                  {countdown}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={profile}
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-lg font-bold rounded"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleSignout}
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-lg font-bold rounded"
            >
              Exit
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
