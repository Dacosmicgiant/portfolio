// models/project.model.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, "At least one technology must be specified"],
    },
    imageUrl: {
      type: String,
      required: [true, "Project image URL is required"],
    },
    githubUrl: {
      type: String,
      required: [true, "GitHub repository URL is required"],
      trim: true,
    },
    deploymentUrl: {
      type: String,
      required: [true, "Deployment URL is required"],
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["completed", "in-progress", "planned"],
      default: "completed",
    }
  },
  { 
    timestamps: true 
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
