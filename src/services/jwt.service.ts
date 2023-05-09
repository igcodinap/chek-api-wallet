import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';

const JWT_SECRET = 'irrelevant-secret-wip';

export class JwtService {
    static verifyToken(token: string): string | jwt.JwtPayload {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new AppError(500, 'Internal server error: jwt verification failed');
        }
    }
}