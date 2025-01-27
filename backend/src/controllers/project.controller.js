// controllers/project.controller.js
import Project from "../models/project.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Add a new project
export const addProject = async (req, res) => {
  try {
    console.log("Starting addProject...");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const { title, description, technologies, githubUrl, deploymentUrl, featured, status } = req.body;

    // Validate required fields
    const missingFields = {};
    if (!title) missingFields.title = true;
    if (!description) missingFields.description = true;
    if (!technologies) missingFields.technologies = true;
    if (!githubUrl) missingFields.githubUrl = true;
    if (!deploymentUrl) missingFields.deploymentUrl = true;

    if (Object.keys(missingFields).length > 0) {
      console.log("Missing required fields:", missingFields);
      return res.status(400).json({ 
        message: "Missing required fields",
        required: missingFields
      });
    }

    // Check if image file exists in request
    if (!req.file) {
      console.log("No image file found in request");
      return res.status(400).json({ message: "Project image is required" });
    }

    // Upload image to Cloudinary
    console.log("Uploading image to Cloudinary...");
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    
    if (!cloudinaryResponse) {
      console.log("Failed to upload image to Cloudinary");
      return res.status(400).json({ message: "Error uploading image to Cloudinary" });
    }
    console.log("Cloudinary upload successful:", cloudinaryResponse.url);

    let parsedTechnologies;
    try {
      parsedTechnologies = JSON.parse(technologies);
      if (!Array.isArray(parsedTechnologies)) {
        throw new Error('Technologies must be an array');
      }
    } catch (error) {
      console.log("Error parsing technologies:", error);
      return res.status(400).json({ 
        message: "Invalid technologies format. Must be a JSON array.",
        error: error.message 
      });
    }

    // Create new project with Cloudinary image URL
    console.log("Creating new project...");
    const newProject = new Project({
      title,
      description,
      technologies: parsedTechnologies,
      imageUrl: cloudinaryResponse.url,
      githubUrl,
      deploymentUrl,
      featured: featured === 'true',
      status: status || 'completed'
    });

    await newProject.save();
    console.log("Project saved successfully:", newProject._id);
    res.status(201).json({ 
      message: "Project added successfully", 
      project: newProject 
    });
  } catch (error) {
    console.error("Error in addProject:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation Error", 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    console.log("Starting getProjects...");
    const projects = await Project.find();
    console.log("Projects retrieved successfully:", projects.length);
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error in getProjects:", error);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {
    console.log("Starting getProjectById...");
    const project = await Project.findById(projectId);

    if (!project) {
      console.log("Project not found:", projectId);
      return res.status(404).json({ message: "Project not found" });
    }

    console.log("Project retrieved successfully:", project._id);
    res.status(200).json(project);
  } catch (error) {
    console.error("Error in getProjectById:", error);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Update a project by ID
export const updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { title, description, technologies, githubUrl, deploymentUrl, featured, status } = req.body;
  
    try {
      console.log("Starting updateProject...");
      let updatedProject = await Project.findById(projectId);

      if (!updatedProject) {
        console.log("Project not found:", projectId);
        return res.status(404).json({ message: "Project not found" });
      }

      // Validate required fields
      const missingFields = {};
      if (!title) missingFields.title = true;
      if (!description) missingFields.description = true;
      if (!technologies) missingFields.technologies = true;
      if (!githubUrl) missingFields.githubUrl = true;
      if (!deploymentUrl) missingFields.deploymentUrl = true;

      if (Object.keys(missingFields).length > 0) {
        console.log("Missing required fields:", missingFields);
        return res.status(400).json({ 
          message: "Missing required fields",
          required: missingFields
        });
      }

      // Check if image file exists in request
      if (req.file) {
        console.log("Uploading image to Cloudinary...");
        // Upload image to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        
        if (!cloudinaryResponse) {
          console.log("Failed to upload image to Cloudinary");
          return res.status(400).json({ message: "Error uploading image to Cloudinary" });
        }
        console.log("Cloudinary upload successful:", cloudinaryResponse.url);

        updatedProject.imageUrl = cloudinaryResponse.url;
      }

      let parsedTechnologies;
      try {
        parsedTechnologies = JSON.parse(technologies);
        if (!Array.isArray(parsedTechnologies)) {
          throw new Error('Technologies must be an array');
        }
      } catch (error) {
        console.log("Error parsing technologies:", error);
        return res.status(400).json({ 
          message: "Invalid technologies format. Must be a JSON array.",
          error: error.message 
        });
      }

      updatedProject.title = title;
      updatedProject.description = description;
      updatedProject.technologies = parsedTechnologies;
      updatedProject.githubUrl = githubUrl;
      updatedProject.deploymentUrl = deploymentUrl;
      updatedProject.featured = featured === 'true';
      updatedProject.status = status || 'completed';

      await updatedProject.save();
      console.log("Project updated successfully:", updatedProject._id);
      res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
      console.error("Error in updateProject:", error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: "Validation Error", 
          errors: Object.values(error.errors).map(err => err.message)
        });
      }
      res.status(500).json({ 
        message: "Internal Server Error",
        error: error.message
      });
    }
  };

// Get featured projects
export const getFeaturedProjects = async (req, res) => {
  try {
    console.log("Starting getFeaturedProjects...");
    const projects = await Project.find({ featured: true });
    console.log("Featured projects retrieved successfully:", projects.length);
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error in getFeaturedProjects:", error);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
    const { projectId } = req.params;
  
    try {
      console.log("Starting deleteProject...");
      const deletedProject = await Project.findByIdAndDelete(projectId);
  
      if (!deletedProject) {
        console.log("Project not found:", projectId);
        return res.status(404).json({ message: "Project not found" });
      }
  
      console.log("Project deleted successfully:", projectId);
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error in deleteProject:", error);
      res.status(500).json({ 
        message: "Internal Server Error",
        error: error.message
      });
    }
  };