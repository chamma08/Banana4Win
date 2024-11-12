import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const veriToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(403, "Access denied, no token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(errorHandler(403, "Invalid token"));
    req.user = decoded;
    next();
  });
};
