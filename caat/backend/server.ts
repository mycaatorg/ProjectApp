import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import collegeRoutes from "./routes/college";
import essayRoutes from "./routes/essays";
import resumeRoutes from "./routes/resume";
import healthRoute from './routes/health';
import taskRoutes from './routes/tasks';

// Load environment variables
dotenv.config();

const app = express();

// Middleware to enable CORS
const allowedOrigins = [
  'https://mycaat.com',
  'https://www.mycaat.com',
  'https://project-app-flax.vercel.app', // Vercel frontend
  'https://projectapp-frontend.onrender.com', // NEW Render frontend URL
  'http://localhost:3000' // Local dev
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options("*", cors()); // Pre-flight

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
app.use('/api/health', healthRoute);
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
