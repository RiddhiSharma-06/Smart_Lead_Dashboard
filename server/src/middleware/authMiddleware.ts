import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(403).json({
        message: "No token provided",
      });
    }

    // Extract token from: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(403).json({
        message: "Invalid token format",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    console.log("TOKEN DECODED:", decoded);

    (req as any).user = decoded;

    console.log("REQ USER:", (req as any).user);

    next();
  } catch (err) {
    console.log("VERIFY TOKEN ERROR:", err);

    return res.status(403).json({
      message: "Token invalid or expired",
    });
  }
};