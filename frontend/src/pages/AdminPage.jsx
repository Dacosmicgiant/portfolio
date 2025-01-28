// AdminPage.jsx
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Loader, Plus, Trash2, Mail, CheckCircle, XCircle } from "lucide-react";
import AddProjectModal from "../components/AddProjectModal";

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, messagesRes] = await Promise.all([
        axiosInstance.get("/api/projects"),
        axiosInstance.get("/api/messages"),
      ]);
      setProjects(projectsRes.data);
      setMessages(messagesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`/api/projects/${projectId}`);
      toast.success("Project deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleUpdateMessageStatus = async (messageId, status) => {
    try {
      await axiosInstance.patch(`/api/messages/${messageId}/status`, { status });
      toast.success("Message status updated");
      fetchData();
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error("Failed to update message status");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axiosInstance.delete(`/api/messages/${messageId}`);
      toast.success("Message deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

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
        {/* Projects Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Projects</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary"
            >
              <Plus size={20} />
              Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="card bg-base-200 shadow-xl"
              >
                <figure className="relative pt-[60%]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{project.title}</h2>
                  <p className="text-base-content/70">{project.description}</p>
                  <div className="flex flex-wrap gap-2 my-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="badge badge-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="btn btn-error btn-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Section */}
        <div>
          <h2 className="text-4xl font-bold mb-8">Messages</h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-base-content/70 py-8">
                No messages yet
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message._id}
                  className="card bg-base-200 shadow-xl"
                >
                  <div className="card-body">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{message.name}</h3>
                        <a
                          href={`mailto:${message.email}`}
                          className="text-primary hover:underline flex items-center gap-2 text-sm sm:text-base"
                        >
                          <Mail size={16} />
                          {message.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-start">
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={0}
                            className={`badge badge-lg cursor-pointer ${
                              message.status === "unread"
                                ? "badge-error"
                                : message.status === "read"
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {message.status}
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdateMessageStatus(message._id, "unread")
                                }
                                className="text-error"
                              >
                                <XCircle size={16} />
                                Mark as Unread
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdateMessageStatus(message._id, "read")
                                }
                                className="text-warning"
                              >
                                <CheckCircle size={16} />
                                Mark as Read
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdateMessageStatus(message._id, "replied")
                                }
                                className="text-success"
                              >
                                <Mail size={16} />
                                Mark as Replied
                              </button>
                            </li>
                          </ul>
                        </div>
                        <button
                          onClick={() => handleDeleteMessage(message._id)}
                          className="btn btn-error btn-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm sm:text-base">{message.message}</p>
                    <div className="text-xs sm:text-sm text-base-content/50 mt-2">
                      {new Date(message.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchData();
        }}
      />
    </div>
  );
};

export default AdminPage;
