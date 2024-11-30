import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TikTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [showMessPopup, setShowMessPopup] = useState(false);

  const handleClose = () => {
    navigate("/");
  };

  const playerImage =
    "https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/p1.png?alt=media&token=ede4743e-c2ee-41c9-81a3-9e7003ddcfc8";
  const computerImage =
    "https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/p2.png?alt=media&token=bab42c7f-2724-425e-b8ff-e9fbe71fff4e";

  const checkWinner = (currentBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    if (currentBoard.every((cell) => cell !== null)) {
      return "Draw";
    }

    return null;
  };

  const handlePlayerMove = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "Player";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const computerMove = (currentBoard) => {
    const emptyCells = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);

    if (emptyCells.length > 0) {
      const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentBoard[randomIndex] = "Computer";
      setBoard([...currentBoard]);
    }
  };

  const mainMenu = () => {
    navigate("/");
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
    } else if (!isPlayerTurn) {
      setTimeout(() => {
        const newBoard = [...board];
        computerMove(newBoard);
        const updatedWinner = checkWinner(newBoard);
        if (updatedWinner) {
          setWinner(updatedWinner);
        } else {
          setIsPlayerTurn(true);
        }
      }, 500);
    }
  }, [board, isPlayerTurn]);

  useEffect(() => {
    if (winner) {
      setShowMessPopup(true);
    }
  }, [winner]);

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/mn2.jpg?alt=media&token=e971155c-0329-4dc1-9601-854608b15f98')",
      }}
    >
      <div className="relative p-6 rounded-lg shadow-lg border-2 border-red-700 w-[40rem] h-[37rem] bg-black bg-opacity-60">
        <div className="flex flex-col items-center space-y-6 ">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="text-yellow-300">SPECIAL </span>TIK TAC TOE{" "}
            <span className="text-yellow-300">MODE</span>
          </h1>

          <div className="grid grid-cols-3 gap-4">
            {board.map((cell, index) => (
              <div
                key={index}
                onClick={() => handlePlayerMove(index)}
                className={`w-20 h-20 border-2 border-black rounded-3xl flex justify-center items-center cursor-pointer ${
                  cell || winner || !isPlayerTurn ? "cursor-not-allowed" : ""
                } bg-green-200`}
              >
                {cell === "Player" && (
                  <img src={playerImage} alt="Player" className="w-26 h-26" />
                )}
                {cell === "Computer" && (
                  <img
                    src={computerImage}
                    alt="Computer"
                    className="w-26 h-26"
                  />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={mainMenu}
            className="px-4 py-2 bg-red-500 text-white rounded-lg w-44 "
          >
            Main Menu
          </button>
        </div>
        {winner && showMessPopup && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
            <div className="p-6 bg-white rounded-lg">
              <h1 className="text-2xl font-bold text-center mb-4">
                Thank You for Playing!
              </h1>
              <p className="text-lg text-center">
                {winner === "Draw"
                  ? "It's a Draw!"
                  : `${
                      winner === "Player"
                        ? "Congratulations! You won 50 points Come back tomorrow for more"
                        : "Try again tomorrow."
                    }`}
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg ml-4"
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
