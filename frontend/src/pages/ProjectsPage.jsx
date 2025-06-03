// ProjectsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Loader, FolderOpen, Star, ExternalLink, Code2, Calendar } from "lucide-react";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/projects");
        console.log("Projects data:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
              Loading Projects
            </h2>
            <p className="text-base-content/60">Discovering amazing work...</p>
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
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl">
              <FolderOpen className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              My Projects
            </h1>
          </div>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            A showcase of my technical journey, creativity, and problem-solving skills through various web applications and software projects.
          </p>
          
          {/* Project Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{projects.length}</div>
              <div className="text-sm text-base-content/60">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-sm text-base-content/60">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">
                {[...new Set(projects.flatMap(p => p.technologies))].length}
              </div>
              <div className="text-sm text-base-content/60">Technologies</div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                to={`/projects/${project._id}`}
                key={project._id}
                className="group card bg-gradient-to-br from-base-100 to-base-200 shadow-xl hover:shadow-2xl border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-warning to-accent text-warning-content px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}

                {/* Project Image */}
                <figure className="relative pt-[60%] overflow-hidden bg-gradient-to-br from-base-300 to-base-200">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-primary/90 backdrop-blur-sm text-primary-content px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <ExternalLink className="w-4 h-4" />
                      <span className="font-semibold">View Project</span>
                    </div>
                  </div>
                </figure>

                <div className="card-body p-6">
                  <h2 className="card-title text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300 mb-2">
                    {project.title}
                  </h2>
                  
                  <p className="text-base-content/70 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`badge badge-sm font-medium transition-colors duration-300 ${
                          techIndex === 0 ? 'badge-primary group-hover:badge-secondary' :
                          techIndex === 1 ? 'badge-secondary group-hover:badge-accent' :
                          techIndex === 2 ? 'badge-accent group-hover:badge-info' :
                          'badge-info group-hover:badge-success'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="badge badge-ghost badge-sm">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-base-content/10">
                    <div className="flex items-center gap-2 text-base-content/60">
                      <Code2 className="w-4 h-4" />
                      <span className="text-xs">Full Stack</span>
                    </div>
                    
                    {project.status && (
                      <div className="flex items-center gap-2 text-base-content/60">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs capitalize">{project.status}</span>
                      </div>
                    )}
                  </div>

                  {/* Gradient Border Animation */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-base-100 to-base-200 -z-10"></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="card bg-gradient-to-br from-base-200 to-base-300 shadow-2xl max-w-md mx-auto border border-primary/20">
              <div className="card-body text-center">
                <div className="p-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full w-fit mx-auto mb-4">
                  <FolderOpen className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-2">No Projects Yet</h3>
                <p className="text-base-content/70 mb-4">
                  The project portfolio is currently being curated. Check back soon for amazing work!
                </p>
                <div className="flex justify-center">
                  <Link to="/" className="btn btn-primary gap-2">
                    <Code2 className="w-4 h-4" />
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;