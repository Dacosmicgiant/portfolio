// controllers/message.controller.js
import Message from "../models/message.model.js";

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Missing required fields",
        required: {
          name: !name,
          email: !email,
          message: !message,
        },
      });
    }

    // Create new message
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();
    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get all messages (admin only)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update message status (admin only)
export const updateMessageStatus = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { status } = req.body;

    if (!["unread", "read", "replied"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be one of: unread, read, replied",
      });
    }

    const message = await Message.findByIdAndUpdate(
      messageId,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      message: "Message status updated successfully",
      data: message,
    });
  } catch (error) {
    console.error("Error in updateMessageStatus:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete message (admin only)
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndDelete(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMessage:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
