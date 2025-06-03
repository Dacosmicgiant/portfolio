import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Loader, Github, Globe, ArrowLeft, Calendar, Star, Code2, ExternalLink, Zap } from "lucide-react";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${id}`);
        console.log("Project data:", response.data);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

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
              Loading Project
            </h2>
            <p className="text-base-content/60">Fetching project details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-16 relative">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-error/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-warning/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl max-w-md mx-auto border border-error/20">
            <div className="card-body text-center">
              <div className="p-6 bg-gradient-to-r from-error/20 to-warning/20 rounded-full w-fit mx-auto mb-4">
                <Code2 className="w-16 h-16 text-error" />
              </div>
              <h1 className="text-3xl font-bold text-error mb-4">Project Not Found</h1>
              <p className="text-base-content/70 mb-6">
                The project you're looking for doesn't exist or has been moved.
              </p>
              <Link to="/projects" className="btn btn-primary gap-2">
                <ArrowLeft size={20} />
                Back to Projects
              </Link>
            </div>
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
        {/* Enhanced Back Button */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="btn btn-ghost gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            {project.featured && (
              <div className="bg-gradient-to-r from-warning to-accent text-warning-content px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                Featured Project
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {project.title}
          </h1>
          
          {project.status && (
            <div className="flex items-center justify-center gap-2 text-base-content/70 mb-6">
              <Calendar size={20} />
              <span className="capitalize font-medium">Status: {project.status}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Enhanced Image Section */}
          <div className="space-y-6">
            <div className="relative group">
              {/* Gradient Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-base-200 to-base-300">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay with Action Buttons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                  <div className="flex gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <Github size={16} />
                      Source
                    </a>
                    <a
                      href={project.deploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700"
                    >
                      <Globe size={16} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Stack Showcase */}
            <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-primary/20">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`badge badge-lg font-medium px-4 py-2 transition-all duration-300 hover:scale-105 ${
                        index % 4 === 0 ? 'badge-primary hover:badge-secondary' :
                        index % 4 === 1 ? 'badge-secondary hover:badge-accent' :
                        index % 4 === 2 ? 'badge-accent hover:badge-info' :
                        'badge-info hover:badge-success'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="space-y-8">
            {/* Project Description */}
            <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-secondary/20">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-primary" />
                  Project Overview
                </h2>
                <p className="text-base-content/80 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg gap-3 group hover:scale-105 transition-all duration-300"
              >
                <Github size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                <div className="text-left">
                  <div className="font-bold">View Source</div>
                  <div className="text-xs opacity-70">GitHub Repository</div>
                </div>
                <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
              
              <a
                href={project.deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg gap-3 group hover:scale-105 transition-all duration-300"
              >
                <Globe size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                <div className="text-left">
                  <div className="font-bold">Live Demo</div>
                  <div className="text-xs opacity-70">Try it out</div>
                </div>
                <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-gradient-to-br from-info/20 to-success/20 text-center p-6 border border-info/30">
                <div className="text-3xl font-bold text-info mb-2">{project.technologies.length}</div>
                <div className="text-sm text-base-content/70">Technologies Used</div>
              </div>
              <div className="card bg-gradient-to-br from-warning/20 to-error/20 text-center p-6 border border-warning/30">
                <div className="text-3xl font-bold text-warning mb-2">
                  {project.featured ? "★" : "♦"}
                </div>
                <div className="text-sm text-base-content/70">
                  {project.featured ? "Featured" : "Standard"} Project
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
              <div className="card-body text-center">
                <h3 className="text-xl font-bold mb-2">Interested in this project?</h3>
                <p className="text-base-content/70 mb-4">
                  Let's discuss how similar solutions can help your business grow.
                </p>
                <Link to="/contact" className="btn btn-accent gap-2 hover:scale-105 transition-all duration-300">
                  <ExternalLink size={20} />
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;