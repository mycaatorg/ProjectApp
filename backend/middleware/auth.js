"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Retrieve the Authorization header
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token (Bearer <token>)
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // Cast to JwtPayload
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Pass control to the next middleware/route handler
    }
    catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.default = authenticateToken;
