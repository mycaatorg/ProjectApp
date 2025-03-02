import { Router, Request, Response, NextFunction } from "express";
import authenticateToken from "../middleware/auth";
import User from "../models/User";

const router = Router();

router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authenticateToken(req, res, next), // ✅ Ensure Express handles middleware properly
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // ✅ Ensure `req.user` exists & has `userId`
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      // ✅ Query user from MongoDB
      const user = await User.findById(userId).select("-password");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user data:", error);
      next(error); // ✅ Pass error to Express error handler
    }
  }
);

export default router;
