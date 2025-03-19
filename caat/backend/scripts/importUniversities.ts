import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import College from "../models/Colleges";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const FILE_PATH = path.join(__dirname, "university-domains-list", "world_universities_and_domains.json");

const importUniversities = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Read and parse JSON file
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    const universities = JSON.parse(data);

    // Map data to match MongoDB schema
    const formattedUniversities = universities.map((uni: any) => ({
      name: uni.name,
      country: uni.country,
      domains: uni.domains,
      web_pages: uni.web_pages,
      alpha_two_code: uni.alpha_two_code,
    }));

    // Insert into MongoDB
    await College.insertMany(formattedUniversities, { ordered: false }).catch((err) => {
      console.error("⚠️ Some duplicates skipped:", err.message);
    });

    console.log(`🎓 Successfully imported ${universities.length} universities!`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error importing universities:", error);
  }
};

// Run script
importUniversities();
