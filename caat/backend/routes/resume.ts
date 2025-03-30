import { Router, Request, Response } from "express";
import authenticateToken from "../middleware/auth";
import Resume from "../models/Resume";

const router = Router();

// GET /api/resume - Load or create user's resume
router.get("/", authenticateToken, async (req: Request, res: Response) => {
        const userId = (req as any).user.userId;
      
        try {
          let resume = await Resume.findOne({ userId });
      
          if (!resume) {
            resume = new Resume({ userId, sections: [] });
            await resume.save();
          }
      
          res.status(200).json({ resume });
        } catch (err) {
          console.error("Error fetching resume:", err);
          res.status(500).json({ message: "Server error" });
        }
      });
      

// POST /api/resume - Replace all resume sections
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { sections } = req.body;

  try {
    const resume = await Resume.findOneAndUpdate(
      { userId },
      { sections },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Resume saved", sections: resume.sections });
  } catch (err) {
    console.error("Error saving resume:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
