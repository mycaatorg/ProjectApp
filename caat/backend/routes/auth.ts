import { Request, Response, Router, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import authenticateToken from '../middleware/auth';

const router = Router();

router.post(
  '/register',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Invalid email or password' });
        return;
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid email or password' });
        return;
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email }, // Payload
        process.env.JWT_SECRET!, // Secret key
        { expiresIn: '1h' } // Token expiration time
      );

      // Respond with the token and user data
      res.status(200).json({
        message: 'Login successful!',
        token, // Send the generated token
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.get(
  "/dashboard",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Ensure `req.user` exists & has `userId`
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      // Query user from MongoDB
      const user = await User.findById(userId).select("-password");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      next(error); // Pass error to Express error handler
    }
  }
);

export default router;
