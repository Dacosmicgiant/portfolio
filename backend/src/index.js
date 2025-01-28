// index.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

import {connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config()
const app = express();

const PORT = process.env.PORT;

// Create temp upload directory if it doesn't exist
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tempUploadDir = join(__dirname, '..', 'public', 'temp');
if (!fs.existsSync(tempUploadDir)) {
    fs.mkdirSync(tempUploadDir, { recursive: true });
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Static files
app.use('/public', express.static(join(__dirname, '..', 'public')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    console.log("server is running on PORT: "+ PORT);
    connectDB();
});
