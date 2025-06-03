// HomePage.jsx

import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Loader, ArrowRight, Code2, Palette, Zap } from 'lucide-react';
import { axiosInstance } from '../lib/axios';
import About from '../components/About';
import Timeline from '../components/Timeline';
import heroImage from "../assets/hero.png";
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useScrollAnimation();
  const descriptionRef = useScrollAnimation();
  const projectsGridRef = useScrollAnimation();

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await axiosInstance.get('/projects/featured');
        console.log("Featured projects:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProjects();
  }, []);

  return (
    <div className="relative">
      {/* Enhanced Hero Section with Full Theme Colors */}
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-16 py-20 lg:py-32">
            <div className="flex-1 max-w-sm opacity-0 animate-fade-in animation-delay-100">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                <img
                  src={heroImage}
                  className="relative w-full rounded-2xl shadow-2xl border-2 border-primary/20"
                  alt="Vedant Vankar"
                />
              </div>
            </div>
            
            <div className="flex-1 max-w-xl text-center lg:text-left">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-primary font-semibold">Full-Stack Developer</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-6xl font-bold leading-tight opacity-0 animate-slide-up">
                    Hello, I'm{" "}
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      Vedant Vankar
                    </span>
                  </h1>
                </div>
                
                <h2 className="text-xl sm:text-2xl mt-4 text-base-content/80 opacity-0 animate-slide-up animation-delay-200">
                  <span className="text-secondary font-semibold">MERN Stack</span> + 
                  <span className="text-accent font-semibold"> AI-Integrated</span> Application Developer
                </h2>
                
                <div className="flex items-center justify-center lg:justify-start gap-2 opacity-0 animate-fade-in animation-delay-300">
                  <Palette className="w-5 h-5 text-primary" />
                  <p className="text-base-content/70 font-medium italic">
                    "keep it simple, keep it clean"
                  </p>
                </div>
                
                {/* Enhanced Social Links */}
                <div className="flex gap-4 justify-center lg:justify-start opacity-0 animate-fade-in animation-delay-400">
                  <a
                    href="https://github.com/Dacosmicgiant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline hover:btn-primary hover:scale-110 transition-all duration-300 border-2"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                  <a
                    href="https://linkedin.com/in/vedant-vankar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline hover:btn-secondary hover:scale-110 transition-all duration-300 border-2"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a
                    href="https://instagram.com/vedant.vankar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline hover:btn-accent hover:scale-110 transition-all duration-300 border-2"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                </div>

                {/* Call to Action */}
                <div className="opacity-0 animate-fade-in animation-delay-500">
                  <Link
                    to="/projects"
                    className="btn btn-primary btn-lg gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <Zap className="w-5 h-5" />
                    View My Work
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Featured Projects Section */}
      <div className="py-20 bg-gradient-to-b from-base-200 to-base-100 relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-0 w-64 h-64 bg-gradient-to-br from-info/20 to-success/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-0 w-64 h-64 bg-gradient-to-br from-warning/20 to-error/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <h2 
                ref={titleRef}
                className="text-4xl sm:text-5xl font-bold opacity-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                Featured Projects
              </h2>
            </div>
            <p 
              ref={descriptionRef}
              className="text-lg text-base-content/70 opacity-0"
            >
              Discover some of my most impactful projects that showcase creativity, technical expertise, and problem-solving skills.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
              <div className="relative">
                <Loader className="animate-spin size-12 text-primary" />
                <div className="absolute inset-0 size-12 animate-ping bg-primary/20 rounded-full"></div>
              </div>
              <p className="text-base-content/60">Loading amazing projects...</p>
            </div>
          ) : projects.length > 0 ? (
            <div 
              ref={projectsGridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0"
            >
              {projects.map((project, index) => (
                <Link
                  to={`/projects/${project._id}`}
                  key={project._id}
                  className="group card bg-gradient-to-br from-base-100 to-base-200 shadow-xl hover:shadow-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <figure className="relative pt-[60%] overflow-hidden bg-gradient-to-br from-base-300 to-base-200">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </figure>
                  
                  <div className="card-body">
                    <h3 className="card-title text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-base-content/70 text-sm line-clamp-2 mb-3">
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
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="card-actions justify-end">
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                        <span className="text-sm">View Project</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="p-6 bg-gradient-to-r from-base-200 to-base-300 rounded-2xl inline-block">
                <Code2 className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                <p className="text-base-content/70 text-lg">No featured projects yet.</p>
                <p className="text-base-content/50 text-sm mt-2">Check back soon for amazing work!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Section with Enhanced Theming */}
      <div className="bg-gradient-to-b from-base-100 to-base-200">
        <About />
      </div>

      {/* Timeline Section with Enhanced Theming */}
      <div className="bg-gradient-to-b from-base-200 to-base-100">
        <Timeline />
      </div>
    </div>
  );
};

export default HomePage;