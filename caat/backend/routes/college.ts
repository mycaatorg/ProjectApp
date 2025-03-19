import { Router, Request, Response } from "express";
import College from "../models/Colleges";

const router = Router();

// GET /api/colleges - Fetch colleges based on search & country
router.get("/", async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const country = req.query.country as string;

    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (country) {
      query.country = country;
    }

    const colleges = await College.find(query);
    res.status(200).json({ colleges });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
