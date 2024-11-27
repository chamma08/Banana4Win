import express from 'express';
import { saveScore,getLeaderboard } from '../controllers/gameSession.Controller.js';
import { veriToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/saveScore',veriToken, saveScore);
router.get('/leaderboard', getLeaderboard);

export default router;
