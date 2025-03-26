// caat/backend/routes/colleges.ts

import { Router, Request, Response } from "express";
import College from "../models/Colleges";
import { collegeSortOptions } from "../utils/sortOptions";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const country = req.query.country as string;
    const sort = req.query.sort as string;

    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (country) {
      query.country = country;
    }

    // Get sort option from the shared utility
    const sortOption = collegeSortOptions[sort] || {};

    const colleges = await College.find(query).sort(sortOption);
    res.status(200).json({ colleges });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
