// models/project.model.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: false, // Optional: URL for the project image
    },
    links: {
      demo: { type: String, required: false }, // Demo link
      code: { type: String, required: false }, // GitHub or repository link
    },
  },
  { timestamps: true } // To automatically store created and updated dates
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
