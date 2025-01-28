// HomePage.jsx

import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';
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
    <div>
      {/* Hero Section */}
      <div className="min-h-screen bg-base-200 flex items-center">
        <div className="container mx-auto px-4">
          <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-16 py-12 lg:py-20">
            <div className="flex-1 max-w-sm opacity-0 animate-fade-in animation-delay-100">
              <img
                src={heroImage}
                className="w-full rounded-lg shadow-2xl"
                alt="Vedant Vankar"
              />
            </div>
            <div className="flex-1 max-w-xl text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight opacity-0 animate-slide-up">
                Hello, I'm Vedant Vankar.
              </h1>
              <h2 className="text-xl sm:text-2xl mt-4 text-base-content/80 opacity-0 animate-slide-up animation-delay-200">
                MERN stack + AI-Integrated Application Developer
              </h2>
              <p className="py-6 text-base-content/70 text-base sm:text-lg max-w-md mx-auto lg:mx-0 opacity-0 animate-fade-in animation-delay-300">
                "keep it simple, keep it clean"
              </p>
              <div className="flex gap-4 justify-center lg:justify-start opacity-0 animate-fade-in animation-delay-400">
                <a
                  href="https://github.com/Dacosmicgiant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-outline hover:btn-primary transition-colors"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  href="https://linkedin.com/in/vedant-vankar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-outline hover:btn-primary transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="https://instagram.com/vedant.vankar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-outline hover:btn-primary transition-colors"
                >
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="py-16 sm:py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 
              ref={titleRef}
              className="text-3xl sm:text-4xl font-bold mb-4 opacity-0"
            >
              Featured Projects
            </h2>
            <p 
              ref={descriptionRef}
              className="text-base-content/70 opacity-0"
            >
              Here are some of my notable projects that showcase my skills and expertise.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader className="animate-spin size-10" />
            </div>
          ) : projects.length > 0 ? (
            <div 
              ref={projectsGridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 opacity-0"
            >
              {projects.map((project, index) => (
                <Link
                  to={`/projects/${project._id}`}
                  key={project._id}
                  className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] duration-300"
                >
                  <figure className="relative pt-[60%] overflow-hidden bg-base-300">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-xl sm:text-2xl">{project.title}</h3>
                    <p className="text-base-content/70 text-sm sm:text-base line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="badge badge-primary badge-sm"
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
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-base-content/70 min-h-[200px] flex items-center justify-center">
              <p>No featured projects yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <About />

      {/* Timeline Section */}
      <Timeline />
    </div>
  );
};

export default HomePage;