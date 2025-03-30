import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import collegeRoutes from "./routes/college";
import essayRoutes from "./routes/essays";
import resumeRoutes from "./routes/resume";


// Load environment variables
dotenv.config();

const app = express();

// Middleware to enable CORS
app.use(cors({
  origin: ['https://mycaat.com',
          "https://project-app-flax.vercel.app", // Vercel frontend
          "http://localhost:3000"
  ], // Allow frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers needed for the frontend
  credentials: true,
}));

app.options("*", cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', dashboardRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/essays", essayRoutes);
app.use("/api/resume", resumeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
