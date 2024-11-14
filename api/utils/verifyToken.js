import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const veriToken = (req, res, next) => {
  let token = req.header('Authorization');

    // Remove 'Bearer ' if it's part of the token
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim(); // Remove 'Bearer ' prefix
    }
    
    if (!token) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'Access denied, no token provided'
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Invalid token'
        });
    }
};
