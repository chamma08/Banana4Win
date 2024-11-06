import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const { difficulty } = location.state || { difficulty: "Easy" };

  // States for timer, score, question, and answer
  const [time, setTime] = useState(
    difficulty === "Easy" ? 60 : difficulty === "Medium" ? 40 : 20
  );
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [questionImageUrl, setQuestionImageUrl] = useState(null);
  const [solution, setSolution] = useState(null); // State to store the solution
  const [userAnswer, setUserAnswer] = useState("");
  const [correct, setCorrect] = useState(null);
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false); // State for timeout popup

  // Countdown timer
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => setTime((time) => time - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setShowTimeoutPopup(true); // Show popup when time runs out
    }
  }, [time]);

  // Fetch question and solution from Banana API
  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        "https://marcconrad.com/uob/banana/api.php"
      );
      setQuestionImageUrl(response.data.question);
      setSolution(response.data.solution); // Set the solution from API
      setCorrect(null);
      setUserAnswer("");
      setTime(difficulty === "Easy" ? 60 : difficulty === "Medium" ? 40 : 20);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  // Retry function to reset game state
  const handleRetry = () => {
    setShowTimeoutPopup(false);
    setScore(0);
    fetchQuestion();
  };

  // Close function to navigate to main menu
  const handleClose = () => {
    navigate("/");
  };

  // Submit answer and compare with the solution
  const submitAnswer = () => {
    if (parseInt(userAnswer) === solution) {
      setCorrect(true);
      setScore((prevScore) => prevScore + time);
      fetchQuestion(); // Fetch a new question
    } else {
      setCorrect(false);
    }
  };

  // Fetch the initial question when the component mounts
  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div
      className="flex justify-center items-center h-screen bg-yellow-200"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/funny-monkey-playing-basketball.jpg?alt=media&token=2cd4fbcd-36a7-4cae-b244-95f7c9d4911c')",
      }}
    >
      <div className="relative p-6 rounded-lg shadow-lg border-2 border-red-700 w-[40rem] h-[35rem] bg-yellow-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/")}
            className="text-red-600 font-bold text-2xl"
          >
            X
          </button>
          <h1 className="text-lg font-bold bg-orange-500 ml-6 px-4 py-2 rounded-lg text-white">
            Game
          </h1>
          <div className="bg-yellow-400 font-bold text-2xl px-4 py-2 rounded-lg">
            {time}
          </div>
        </div>

        {/* Score Display */}
        <div className="absolute top-7 left-24 bg-green-500 text-white font-bold text-xl px-4 py-2 rounded-lg">
          Score: {score}
        </div>

        {/* Question Area */}
        <div className="bg-white p-4 mb-4 rounded-lg border-2">
          <h2 className="text-center font-bold text-lg">Question</h2>
          {questionImageUrl ? (
            <img src={questionImageUrl} alt="Question" className="mx-auto" />
          ) : (
            <p className="text-center">Loading question...</p>
          )}
        </div>

        {/* Answer Section */}
        <div className="flex items-center justify-center space-x-2">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Enter Your Answer
          </div>
          <input
            type="text"
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

        {/* Feedback Section */}
        {correct !== null && (
          <div className="text-center mt-4">
            {correct ? (
              <p className="text-green-500 font-bold">Correct!</p>
            ) : (
              <p className="text-red-500 font-bold">Incorrect, try again.</p>
            )}
          </div>
        )}

        {/* Timeout Popup */}
        {showTimeoutPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Time's up!</h2>
              <p className="mb-6">Retry or Go back to the main menu?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleRetry}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Retry
                </button>
                <button
                  onClick={handleClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
