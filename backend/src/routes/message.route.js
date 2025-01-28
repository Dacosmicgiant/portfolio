// routes/message.route.js
import express from "express";
import { sendMessage, getMessages, updateMessageStatus, deleteMessage } from "../controllers/message.controller.js";
import { protectAdminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route to send a message
router.post("/", sendMessage);

// Admin routes
router.get("/", protectAdminRoute, getMessages);
router.patch("/:messageId/status", protectAdminRoute, updateMessageStatus);
router.delete("/:messageId", protectAdminRoute, deleteMessage);

export default router;
