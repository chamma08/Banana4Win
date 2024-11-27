import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { difficulty, username } = location.state || {
    difficulty: "Easy",
    username: "guest",
  };

  const [time, setTime] = useState(
    difficulty === "Easy" ? 60 : difficulty === "Medium" ? 40 : 20
  );
  const [score, setScore] = useState(0);
  const [questionImageUrl, setQuestionImageUrl] = useState(null);
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [correct, setCorrect] = useState(null);
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);
  const [lifelines, setLifelines] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [questionLoaded, setQuestionLoaded] = useState(false);

  useEffect(() => {
    if (!questionLoaded || gameOver || time <= 0) {
      if (time <= 0 || gameOver) {
        setShowTimeoutPopup(true);
        submitScore(score);
      }
      return;
    }

    const timer = setInterval(() => setTime((time) => time - 1), 1000);

    return () => clearInterval(timer);
  }, [time, gameOver, questionLoaded]);

  const fetchQuestion = async () => {
    try {
      setQuestionLoaded(false);
      const response = await axios.get(
        "https://marcconrad.com/uob/banana/api.php"
      );
      setQuestionImageUrl(response.data.question);
      setSolution(response.data.solution);
      setCorrect(null);
      setUserAnswer("");
      setTime(difficulty === "Easy" ? 60 : difficulty === "Medium" ? 40 : 20);
      setQuestionLoaded(true);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  const submitScore = async (score) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/scores/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          score,
          username: currentUser?.username || "guest",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to submit score:", data.message);
      } else {
        console.log("Score submitted successfully", data);
      }
    } catch (error) {
      console.error("Failed to submit score:", error.message);
    }
  };

  const handleRetry = () => {
    setShowTimeoutPopup(false);
    setScore(0);
    setLifelines(3);
    setGameOver(false);
    fetchQuestion();
  };

  const handleClose = () => {
    navigate("/");
  };

  const submitAnswer = () => {
    if (parseInt(userAnswer) === solution) {
      setCorrect(true);
      setScore((prevScore) => prevScore + time);
      fetchQuestion();
    } else {
      setCorrect(false);
      setLifelines((prevLifelines) => prevLifelines - 1);
      if (lifelines - 1 <= 0) {
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/mn2.jpg?alt=media&token=e971155c-0329-4dc1-9601-854608b15f98')",
      }}
    >
      <div className="relative p-6 rounded-lg shadow-lg border-2 border-red-700 w-[40rem] h-[37rem] bg-black bg-opacity-60">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleClose}
            className="text-red-600 font-bold text-3xl top-0 left-0 absolute"
          >
            <svg
              className="w-[35px] h-[35px] text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="font-bold text-2xl px-4 py-2 rounded-lg flex items-center space-x-2">
            <img
              src="/deadline.png"
              alt="Timer Icon"
              className="w-10 h-10 animate-flip-slow"
            />
            <span
              className={`text-3xl ${
                time <= 10 ? "text-red-600 animate-blink" : "text-white"
              }`}
              style={{
                animation: time <= 10 ? "blink 1s step-end infinite" : "none",
              }}
            >
              {time}
            </span>
          </div>
        </div>

        <div className="absolute top-7 left-64 bg-green-500 text-white font-bold text-xl px-4 py-2 rounded-lg">
          Score: {score}
        </div>
        <div className="absolute top-7 right-10 flex space-x-2">
          {[...Array(3)].map((_, index) => (
            <img
              key={index}
              src="/b.png"
              alt="Lifeline"
              className={`w-10 h-10 ${
                index < lifelines ? "visible" : "invisible"
              }`}
            />
          ))}
        </div>

        <div className="bg-white p-4 mb-4 rounded-lg border-2">
          <h2 className="text-center font-bold text-lg">Question</h2>
          {questionImageUrl ? (
            <img src={questionImageUrl} alt="Question" className="mx-auto" />
          ) : (
            <p className="text-center">Loading question...</p>
          )}
        </div>

        <div className="flex items-center justify-center space-x-2">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Enter Your Answer
          </div>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2"
            placeholder="Answer"
          />
          <button
            onClick={submitAnswer}
            className="bg-yellow-400 px-4 py-2 rounded-lg font-bold"
          >
            Enter
          </button>
        </div>

        {correct !== null && (
          <div className="text-center mt-4">
            {correct ? (
              <p className="text-green-500 font-bold">Correct!</p>
            ) : (
              <p className="text-red-500 font-bold">Incorrect, try again</p>
            )}
          </div>
        )}

        {showTimeoutPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Time's up!</h2>
              <img src="/sd.png" alt="Banana" className="w-10 h-10 mx-auto" />
              <p className="mb-4">The correct answer was: {solution}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleRetry}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                >
                  <svg
                    class="w-[35px] h-[35px] text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Main Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white w-80 h-64 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Game Over</h2>
              <img src="/sd.png" alt="Banana" className="w-20 h-20 mx-auto" />
              <p className="mb-4 mt-2">
                You've used all your{" "}
                <span className="text-yellow-400 font-semibold">bananas</span>
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleRetry}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                >
                  <svg
                    class="w-[40px] h-[40px] text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Main Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
