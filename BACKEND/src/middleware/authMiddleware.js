import jwt from 'jsonwebtoken';
import { userModel } from '../model/userModel.js';
import { config } from '../config/config.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = await userModel.findById(decoded.id).select('-password');
            return next();
        } catch (error) {
            console.log('JWT ERROR:', error.message); 
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    return res.status(401).json({ message: 'Not authorized, no token' });
};
