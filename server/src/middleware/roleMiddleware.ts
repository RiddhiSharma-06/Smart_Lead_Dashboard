import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRole = req.user.role?.toLowerCase();

      const allowedRoles = roles.map((r) => r.toLowerCase());

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Role authorization failed",
      });
    }
  };
};