import { Request, Response, Router, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import authenticateToken from '../middleware/auth';

const router = Router();

// Register Route
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age: null,
      school: "",
      major: "",
    });

    await newUser.save();

    // Generate token for the new user
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: '2h' }
    );

    // Return token + user
    res.status(201).json({
      message: 'User registered successfully!',
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        age: newUser.age,
        school: newUser.school,
        major: newUser.major,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '2h' });

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        school: user.school,
        major: user.major,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Profile
router.get('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update User Profile
router.put('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const updateFields = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true, runValidators: true });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'Profile updated successfully!', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
