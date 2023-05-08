import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/jwt.service';
import AppError from '../errors/AppError';

export class AuthMiddleware {
    public static async authorize(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new AppError(401, 'Unauthorized: No token');
            }
            const decoded = JwtService.verifyToken(token);
            if (typeof decoded === 'string') {
                throw new AppError(401, 'Unauthorized: Invalid token');
            }
            res.locals.userId = decoded.userId;
            next();
        } catch (error) {
            next(error);
        }
    }
}