import express from 'express';
import { saveScore } from '../controllers/gameSession.Controller.js';
import { veriToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/saveScore',veriToken, saveScore);

export default router;
