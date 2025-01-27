// HomePage.jsx

import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { axiosInstance } from '../lib/axios';
import About from '../components/About';
import Timeline from '../components/Timeline';
import heroImage from "../assets/hero.png";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="pt-16">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={heroImage}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Vedant Vankar"
          />
          <div>
            <h1 className="text-5xl font-bold">Hello, I'm Vedant Vankar.</h1>
            <h2 className="text-2xl mt-4">MERN stack + AI-Integrated Application Developer</h2>
            <p className="py-6">
              A passionate developer focused on creating innovative solutions using cutting-edge technologies.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                <FaGithub className="text-xl" />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10 text-center">Featured Projects</h2>
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader className="animate-spin size-10" />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  to={`/projects/${project._id}`}
                  key={project._id}
                  className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105 duration-300"
                >
                  <figure className="relative pt-[60%] overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-2xl">{project.title}</h3>
                    <p className="text-base-content/70">{project.description}</p>
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
            <div className="text-center text-lg text-base-content/70">
              No featured projects available yet.
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