// seedAdmin.js

import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/user.model.js"; // Adjust the path if needed

dotenv.config(); // This loads the environment variables from the .env file

const seedAdmin = async () => {
  try {
    const mongoUri = "mongodb+srv://vedantvanpro:3po27K1Gy4nSjqTn@cluster0.wi574.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=Cluster0";
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const email = "vedantvanpro@gmail.com";
    const password = "Omshiva@11";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Hash the admin's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new User({
      fullName: "Admin User",
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("Admin user created:", admin);
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
