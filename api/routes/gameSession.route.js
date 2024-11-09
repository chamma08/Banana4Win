import express from "express";

import {
  createGameSession,
  getLeaderboard,
} from "../controllers/gameSession.Controller.js";

const router = express.Router();

router.post("/create-session", createGameSession);
router.get("/leaderboard", getLeaderboard);

export default router;