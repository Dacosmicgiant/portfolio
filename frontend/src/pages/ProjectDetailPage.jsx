import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Loader, Github, Globe, ArrowLeft, Calendar } from "lucide-react";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/api/projects/${id}`);
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
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-base-100 pt-16">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <Link to="/projects" className="btn btn-primary">
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto px-4 py-10">
        <Link
          to="/projects"
          className="btn btn-ghost gap-2 mb-8 hover:bg-base-200"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="relative group">
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4 lg:space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="badge badge-primary badge-md lg:badge-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-base lg:text-lg leading-relaxed">{project.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2 flex-1 sm:flex-none"
              >
                <Github size={20} />
                View Source
              </a>
              <a
                href={project.deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2 flex-1 sm:flex-none"
              >
                <Globe size={20} />
                Live Demo
              </a>
            </div>

            {project.status && (
              <div className="flex items-center gap-2 text-base-content/70">
                <Calendar size={16} />
                <span>Status: {project.status}</span>
              </div>
            )}
            {project.featured && (
              <div className="badge badge-accent">Featured Project</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
