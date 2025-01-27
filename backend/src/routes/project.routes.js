// routes/project.route.js
import express from "express";
import { addProject, getProjects, getProjectById } from "../controllers/project.controller.js";
import { protectAdminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// // Admin: Add a project (protected route)
// router.post("/", protectRoute, addProject);

// Get all projects
router.get("/", getProjects);

// Get project by ID
router.get("/:projectId", getProjectById);

// routes/project.route.js
router.post("/", protectAdminRoute, addProject);


export default router;
