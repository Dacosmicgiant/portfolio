// AdminPage.jsx
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Loader, Plus, X } from "lucide-react";

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [],
    githubUrl: "",
    deploymentUrl: "",
    featured: false,
    status: "completed",
    techInput: "", // Temporary state for technology input
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/projects/${id}`);
      toast.success("Project deleted!");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter' && newProject.techInput.trim()) {
      e.preventDefault();
      if (!newProject.technologies.includes(newProject.techInput.trim())) {
        setNewProject({
          ...newProject,
          technologies: [...newProject.technologies, newProject.techInput.trim()],
          techInput: ''
        });
      }
    }
  };

  const removeTechnology = (techToRemove) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter(tech => tech !== techToRemove)
    });
  };

  const handleAddProject = async () => {
    try {
      if (!selectedImage) {
        toast.error("Please select an image for the project");
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('title', newProject.title);
      formData.append('description', newProject.description);
      formData.append('technologies', JSON.stringify(newProject.technologies));
      formData.append('githubUrl', newProject.githubUrl);
      formData.append('deploymentUrl', newProject.deploymentUrl);
      formData.append('featured', newProject.featured);
      formData.append('status', newProject.status);

      await axiosInstance.post("/projects", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success("Project added successfully!");
      setNewProject({
        title: "",
        description: "",
        technologies: [],
        githubUrl: "",
        deploymentUrl: "",
        featured: false,
        status: "completed",
        techInput: "",
      });
      setSelectedImage(null);
      setImagePreview(null);
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold mb-8">Admin Panel</h1>
        <div className="mb-8 bg-base-200 p-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Add New Project</h2>
          
          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="GitHub URL"
              className="input input-bordered w-full"
              value={newProject.githubUrl}
              onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
            />
            <input
              type="text"
              placeholder="Deployment URL"
              className="input input-bordered w-full"
              value={newProject.deploymentUrl}
              onChange={(e) => setNewProject({ ...newProject, deploymentUrl: e.target.value })}
            />
            <select
              className="select select-bordered w-full"
              value={newProject.status}
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full mb-4"
            rows="4"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />

          {/* Technologies */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Technologies (Press Enter to add)</label>
            <input
              type="text"
              placeholder="Add technology"
              className="input input-bordered w-full"
              value={newProject.techInput}
              onChange={(e) => setNewProject({ ...newProject, techInput: e.target.value })}
              onKeyDown={handleTechKeyDown}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="badge badge-primary gap-2"
                >
                  {tech}
                  <button onClick={() => removeTechnology(tech)}>
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="form-control w-52 mb-4">
            <label className="cursor-pointer label">
              <span className="label-text">Featured Project</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={newProject.featured}
                onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
              />
            </label>
          </div>

          <button 
            className="btn btn-primary"
            onClick={handleAddProject}
          >
            <Plus className="size-4" />
            Add Project
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-4">Existing Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="card bg-base-200 shadow-xl">
              <figure>
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p className="text-sm text-base-content/70">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="badge badge-sm">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                    GitHub
                  </a>
                  <a href={project.deploymentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                    Demo
                  </a>
                </div>
                <button
                  className="btn btn-error btn-sm mt-4"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
