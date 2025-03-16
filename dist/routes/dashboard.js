"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get("/", auth_1.default, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract user ID from the token
        const user = await User_1.default.findById(userId).select("-password"); // Fetch user info (exclude password)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
