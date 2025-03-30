import { Router, Request, Response } from "express";
import authenticateToken from "../middleware/auth";
import Essay from "../models/Essay";

const router = Router();

// Get saved essay for logged-in user
router.get("/:type", authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { type } = req.params;

    const essay = await Essay.findOne({ userId, essayType: type });

    res.status(200).json({ content: essay?.content || "" });
  } catch (err) {
    console.error("Error fetching essay:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Save or update essay
router.post("/:type", authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { type } = req.params;
    const { content } = req.body;

    const existingEssay = await Essay.findOne({ userId, essayType: type });

    if (existingEssay) {
      existingEssay.content = content;
      existingEssay.lastUpdated = new Date();
      await existingEssay.save();
    } else {
      await Essay.create({ userId, essayType: type, content });
    }

    res.status(200).json({ message: "Essay saved" });
  } catch (err) {
    console.error("Error saving essay:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
