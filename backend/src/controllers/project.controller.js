// controllers/project.controller.js
import Project from "../models/project.model.js";

// Add a new project
export const addProject = async (req, res) => {
  const { title, description, technologies, image, links } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      technologies,
      image,
      links,
    });

    await newProject.save();
    res.status(201).json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    console.log("Error in addProject:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.log("Error in getProjects:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.log("Error in getProjectById:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
