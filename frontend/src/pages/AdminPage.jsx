// AdminPage.jsx
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Loader, Plus, Trash2, Mail, CheckCircle, XCircle, Shield, BarChart3, Users, MessageCircle, Star, Calendar, Eye } from "lucide-react";
import AddProjectModal from "../components/AddProjectModal";

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalMessages: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, messagesRes] = await Promise.all([
        axiosInstance.get("/projects"),
        axiosInstance.get("/messages"),
      ]);
      
      const projectsData = projectsRes.data;
      const messagesData = messagesRes.data;
      
      setProjects(projectsData);
      setMessages(messagesData);
      
      // Calculate stats
      setStats({
        totalProjects: projectsData.length,
        featuredProjects: projectsData.filter(p => p.featured).length,
        totalMessages: messagesData.length,
        unreadMessages: messagesData.filter(m => m.status === 'unread').length
      });
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
      await axiosInstance.delete(`/projects/${projectId}`);
      toast.success("Project deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleUpdateMessageStatus = async (messageId, status) => {
    try {
      await axiosInstance.patch(`/messages/${messageId}/status`, { status });
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
      await axiosInstance.delete(`/messages/${messageId}`);
      toast.success("Message deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex justify-center items-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <Loader className="animate-spin size-16 text-primary mx-auto" />
            <div className="absolute inset-0 size-16 animate-ping bg-primary/20 rounded-full mx-auto"></div>
            <div className="absolute inset-2 size-12 animate-pulse bg-secondary/20 rounded-full mx-auto"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Loading Admin Dashboard
            </h2>
            <p className="text-base-content/60">Fetching data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-info/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                <Shield className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Manage your portfolio content, monitor visitor messages, and maintain your digital presence.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 shadow-lg">
            <div className="card-body text-center">
              <div className="p-3 bg-primary/20 rounded-full w-fit mx-auto mb-3">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">{stats.totalProjects}</div>
              <div className="text-sm text-base-content/70">Total Projects</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 shadow-lg">
            <div className="card-body text-center">
              <div className="p-3 bg-secondary/20 rounded-full w-fit mx-auto mb-3">
                <Star className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-secondary">{stats.featuredProjects}</div>
              <div className="text-sm text-base-content/70">Featured Projects</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 shadow-lg">
            <div className="card-body text-center">
              <div className="p-3 bg-accent/20 rounded-full w-fit mx-auto mb-3">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent">{stats.totalMessages}</div>
              <div className="text-sm text-base-content/70">Total Messages</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/30 shadow-lg">
            <div className="card-body text-center">
              <div className="p-3 bg-warning/20 rounded-full w-fit mx-auto mb-3">
                <Mail className="w-8 h-8 text-warning" />
              </div>
              <div className="text-3xl font-bold text-warning">{stats.unreadMessages}</div>
              <div className="text-sm text-base-content/70">Unread Messages</div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Projects Management
              </h2>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary gap-2 hover:scale-105 transition-all duration-300"
            >
              <Plus size={20} />
              Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="group card bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-warning to-accent text-warning-content px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}

                <figure className="relative pt-[60%] overflow-hidden bg-gradient-to-br from-base-300 to-base-200">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </figure>

                <div className="card-body p-6">
                  <h3 className="card-title text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-base-content/70 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`badge badge-sm font-medium ${
                          techIndex === 0 ? 'badge-primary' :
                          techIndex === 1 ? 'badge-secondary' : 'badge-accent'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="badge badge-ghost badge-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-base-content/10">
                    <div className="flex items-center gap-2 text-base-content/60">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs">View Details</span>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="btn btn-error btn-sm gap-1 hover:scale-105 transition-all duration-300"
                    >
                      <Trash2 size={14} />
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
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-accent/20 rounded-lg">
              <MessageCircle className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-info bg-clip-text text-transparent">
              Messages Management
            </h2>
          </div>

          <div className="space-y-6">
            {messages.length === 0 ? (
              <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-info/20">
                <div className="card-body text-center py-12">
                  <div className="p-6 bg-gradient-to-r from-info/20 to-accent/20 rounded-full w-fit mx-auto mb-4">
                    <MessageCircle className="w-16 h-16 text-info" />
                  </div>
                  <h3 className="text-2xl font-bold text-base-content mb-2">No Messages Yet</h3>
                  <p className="text-base-content/70">
                    When visitors send messages through your contact form, they'll appear here.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message._id}
                  className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-base-content/10 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="card-body p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-base-content">{message.name}</h3>
                            <a
                              href={`mailto:${message.email}`}
                              className="text-primary hover:text-secondary hover:underline flex items-center gap-2 text-sm transition-colors duration-200"
                            >
                              <Mail size={16} />
                              {message.email}
                            </a>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-base-content/60" />
                            <span className="text-xs text-base-content/60">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="bg-base-200/50 rounded-lg p-4 mb-4">
                          <p className="text-base-content/80 whitespace-pre-wrap leading-relaxed">
                            {message.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:min-w-[200px]">
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={0}
                            className={`badge badge-lg cursor-pointer px-4 py-2 font-medium ${
                              message.status === "unread"
                                ? "badge-error"
                                : message.status === "read"
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-content/10"
                          >
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdateMessageStatus(message._id, "unread")
                                }
                                className="text-error hover:bg-error/10"
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
                                className="text-warning hover:bg-warning/10"
                              >
                                <Eye size={16} />
                                Mark as Read
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdateMessageStatus(message._id, "replied")
                                }
                                className="text-success hover:bg-success/10"
                              >
                                <CheckCircle size={16} />
                                Mark as Replied
                              </button>
                            </li>
                          </ul>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteMessage(message._id)}
                          className="btn btn-error btn-sm gap-2 hover:scale-105 transition-all duration-300"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
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