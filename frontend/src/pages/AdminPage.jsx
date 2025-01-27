// AdminPage.jsx
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
  });

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
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

  const handleAddProject = async () => {
    try {
      await axiosInstance.post("/projects", newProject);
      toast.success("Project added!");
      setNewProject({ title: "", description: "", image: "" });
      fetchProjects();
    } catch (error) {
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Add New Project</h2>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered mb-2"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="input input-bordered mb-2"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered mb-2"
            value={newProject.image}
            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
          />
          <button className="btn btn-primary" onClick={handleAddProject}>
            Add Project
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-4">Existing Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="card bg-base-200 shadow-xl">
              <figure>
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description}</p>
                <button
                  className="btn btn-error mt-2"
                  onClick={() => handleDelete(project.id)}
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
