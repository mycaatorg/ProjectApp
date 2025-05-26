import { Router, Request, Response } from 'express';
import authenticateToken from '../middleware/auth';
import User from '../models/User';
import Essay from '../models/Essay';

const router = Router();

const handleTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    console.log("🔍 req.user =", req.user);
    console.log("🔍 Extracted userId =", userId);

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await User.findById(userId).select('name');

    console.log("🧾 user.name =", user?.name);

    const nicknameFilled = !!user?.name?.trim();

    const essays = await Essay.find({ userId }).select('content');

    console.log("📚 Essays found =", essays.map(e => e.content));

    const hasWrittenEssay = essays.some(
      (e) => e.content?.trim().split(/\s+/).length >= 1
    );

    console.log("✅ Final task result =", {
        fillNickname: nicknameFilled,
        writeEssay: hasWrittenEssay,
      });

    res.status(200).json({
      fillNickname: nicknameFilled,
      writeEssay: hasWrittenEssay,
    });
  } catch (err) {
    console.error('Error in /api/tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

router.get('/', authenticateToken, handleTasks);

export default router;
