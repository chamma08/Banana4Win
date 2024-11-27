import GameSession from "../models/gameSession.model.js";

export const saveScore = async (req, res) => {
  try {
    const { user, score, username } = req.body;

    if (!user && !username) {
      return res
        .status(400)
        .json({ success: false, message: "User data is missing" });
    }

    let parsedUser = {};
    if (user) {
      try {
        parsedUser = JSON.parse(user);
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid user data format" });
      }
    }

    const userId = parsedUser._id || null;
    const finalUsername = parsedUser.username || username;

    if (!userId && !finalUsername) {
      return res.status(400).json({
        success: false,
        message: "User ID or username is missing",
      });
    }

    // Check if the user already has a score
    const existingSession = await GameSession.findOne({
      $or: [{ userId }, { username: finalUsername }],
    });

    if (existingSession) {
      if (score > existingSession.score) {
        // Update with the new higher score
        existingSession.score = score;
        await existingSession.save();
        return res.status(200).json({
          success: true,
          message: "Score updated successfully!",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "New score is not higher than the previous score. No update made.",
        });
      }
    }

    // Save new score if no previous record exists
    const gameSession = new GameSession({
      userId,
      username: finalUsername,
      score,
    });
    await gameSession.save();

    res
      .status(200)
      .json({ success: true, message: "Score saved successfully!" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ success: false, message: "Error saving score" });
  }
};


export const getLeaderboard = async (req, res) => {
  try {
    const topScores = await GameSession.find().sort({ score: -1 }).limit(10);

    res.status(200).json(topScores);
  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
