import GameSession from "../models/gameSession.model.js";

// Create a new game session
export const createGameSession = async (req, res) => {
  const { userId, score } = req.body;
  try {
    const gameSession = new GameSession({ user: userId, score });
    await gameSession.save();
    res.status(201).json({ message: "Game session saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get leaderboard based on high scores
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await GameSession.aggregate([
      {
        $group: {
          _id: "$user",
          maxScore: { $max: "$score" },
        },
      },
      {
        $sort: { maxScore: -1 },
      },
      { $limit: 10 },
    ]).exec();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
