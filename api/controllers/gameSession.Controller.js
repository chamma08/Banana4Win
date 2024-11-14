import GameSession from "../models/gameSession.model.js";

export const saveScore = async (req, res) => {
  try {
      const { score,username } = req.body;
      const userId = req.user.userId;

      if (!score) {
          return res.status(400).json({ success: false, message: "Score is required" });
      }

      const gameSession = new GameSession({ userId, score,username });
      await gameSession.save();
      
      res.status(200).json({ success: true, message: "Score saved successfully" });
  } catch (error) {
      console.error("Error saving score:", error);
      res.status(500).json({ success: false, message: "Error saving score", error });
  }
};
