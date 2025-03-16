"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to enable CORS
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'], // Allow your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all necessary methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers needed for the frontend
    credentials: true, // Allow cookies or credentials if required
}));
// Middleware to parse JSON
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Routes
app.use('/api/auth', auth_1.default);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
