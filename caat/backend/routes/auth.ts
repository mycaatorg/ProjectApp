import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

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

      // If the login is successful
      res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
