// project.route.js

import express from "express";
import { addProject, getProjects, getProjectById } from "../controllers/project.controller.js";
import { protectAdminRoute } from "../middleware/auth.middleware.js";
import { updateProject, deleteProject } from "../controllers/project.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// Admin: Add a project (protected route) with image upload
router.post("/", protectAdminRoute, (req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            return res.status(400).json({
                message: "File upload error",
                error: err.message
            });
        }
        next();
    });
}, addProject);

// Get all projects
router.get("/", getProjects);

// Get project by ID
router.get("/:projectId", getProjectById);

// Update a project by ID (protected route) with optional image upload
router.put("/:projectId", protectAdminRoute, (req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            return res.status(400).json({
                message: "File upload error",
                error: err.message
            });
        }
        next();
    });
}, updateProject);

// Delete a project by ID (protected route)
router.delete("/:projectId", protectAdminRoute, deleteProject);

export default router;
