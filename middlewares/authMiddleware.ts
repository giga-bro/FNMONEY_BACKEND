import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const { JWT_SECRET } = require('../config/config')

interface AuthRequest extends Request {
    userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
        return res.status(403).send({ message: 'No token provided' });
    }

    console.log(token)

    jwt.verify(token, JWT_SECRET, (err : any, decoded: any) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        req.userId = decoded.id;
        next();
    });
};

export default authMiddleware;
