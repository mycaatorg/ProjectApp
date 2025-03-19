import { Router, Request, Response, NextFunction } from "express";
import authenticateToken from "../middleware/auth";
import User from "../models/User";

const router = Router();

// GET /dashboard - Fetch authenticated user's profile
router.get(
  "/dashboard",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const user = await User.findById(userId).select("-password");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user data:", error);
      next(error);
    }
  }
);

// GET /profile - Fetch authenticated user's profile (used in frontend)
router.get(
  "/profile",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const user = await User.findById(userId).select("-password");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user data:", error);
      next(error);
    }
  }
);

router.put(
  "/profile",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const updateFields = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true, runValidators: true });

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ message: "Profile updated successfully!", user: updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
      next(error);
    }
  }
);


export default router;
