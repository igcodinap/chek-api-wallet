import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";

export class JwtService {
  static jwtSecret = process.env.JWT_SECRET || "";
  static verifyToken(token: string): string | jwt.JwtPayload {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      throw new AppError(500, "Internal server error: jwt verification failed");
    }
  }
}
