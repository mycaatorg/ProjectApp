"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Check if the user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hash the password
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // Create a new user
        const newUser = new User_1.default({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user exists in the database
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, // Payload
        process.env.JWT_SECRET, // Secret key
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/dashboard', authenticateToken_1.default, // Use middleware to verify the token
async (req, res) => {
    try {
        // Get the authenticated user's data from the token
        const { userId } = req.user;
        // Fetch the user's data from the database
        const user = await User_1.default.findById(userId).select('-password'); // Exclude the password field
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Send the user data as the response
        res.status(200).json({ user });
    }
    catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
