import React, { useState } from "react";
import { X, Upload, Loader } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AddProjectModal = ({ isOpen, onClose, onSuccess }) => {
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubUrl: "",
    deploymentUrl: "",
    technologies: [],
    featured: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTechnology, setNewTechnology] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTechnology = (e) => {
    e.preventDefault();
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }));
      setNewTechnology("");
    }
  };

  const handleRemoveTechnology = (techToRemove) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "technologies") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      await axiosInstance.post("/projects", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Project added successfully!");
      onSuccess();
      resetForm();
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error(error.response?.data?.message || "Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      githubUrl: "",
      deploymentUrl: "",
      technologies: [],
      featured: false,
    });
    setSelectedImage(null);
    setImagePreview(null);
    setNewTechnology("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-base-100 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Heading */}
        <div className="sticky top-0 bg-base-100 p-3 sm:p-4 border-b border-base-300 flex justify-between items-center z-10">
          <h2 className="text-xl sm:text-2xl font-bold">Add New Project</h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <X size={20} />
          </button>
        </div>

        {/*project submit form */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project title"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* add description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project description"
              className="textarea textarea-bordered h-24"
              required
            />
          </div>

          {/* add display image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Project Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full text-sm sm:text-base"
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* add github url */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">GitHub URL</span>
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* add deployment url */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Deployment URL</span>
              </label>
              <input
                type="url"
                name="deploymentUrl"
                value={formData.deploymentUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Technologies */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Technologies</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add technology"
                className="input input-bordered flex-1"
              />
              <button
                onClick={handleAddTechnology}
                className="btn btn-primary whitespace-nowrap"
                type="button"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="badge badge-primary gap-2"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="btn btn-ghost btn-xs px-1"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
            
          {/* toggle is featured project? */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Featured Project</span>
            </label>
          </div>

          {/* add project */}
          <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost w-full sm:w-auto"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <Upload size={20} />
                  Add Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default AddProjectModal;
