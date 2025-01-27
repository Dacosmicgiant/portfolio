// project.route.js

import express from "express";
import { addProject, getProjects, getProjectById } from "../controllers/project.controller.js";
import { protectAdminRoute } from "../middleware/auth.middleware.js";
import { updateProject, deleteProject } from "../controllers/project.controller.js";

const router = express.Router();

// Admin: Add a project (protected route)
router.post("/", protectAdminRoute, addProject);

// Get all projects
router.get("/", getProjects);

// Get project by ID
router.get("/:projectId", getProjectById);

// Update a project by ID (protected route)
router.put("/:projectId", protectAdminRoute, updateProject);

// Delete a project by ID (protected route)
router.delete("/:projectId", protectAdminRoute, deleteProject);



export default router;
