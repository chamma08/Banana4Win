import express from "express";
import { deleteUser, signout, test, updateUser, saveScore } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { veriToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId',verifyToken ,updateUser);
router.delete('/delete/:userId',verifyToken ,deleteUser);
router.post("/updateScore",veriToken, saveScore);
router.post('/signout',signout);


export default router;

