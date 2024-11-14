import jwst from 'jsonwebtoken';
import {errorHandler} from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; // Assuming token is stored in cookies
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Corrected from jwst to jwt
        if (err) {
            return next(errorHandler(403, 'Forbidden'));
        }
        req.user = user; // Attach decoded user information to req.user
        next();
    });
};
