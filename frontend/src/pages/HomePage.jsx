import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import About from '../components/About';
import Timeline from '../components/Timeline';
import heroImage from "../assets/hero.png";
import chatImage from "../assets/images/chit-chat.png";
import focusImage from "../assets/images/focus-flow.png";
import priorityImage from "../assets/images/priority-pal.png";

const HomePage = () => {
  const projects = [
    {
      id: 1,
      title: "Chit-Chat",
      description: "Real-Time Chat Application",
      image: chatImage,
      link: "/projects/1"
    },
    {
      id: 2,
      title: "Focus-Flow",
      description: "An intelligent study assistant",
      image: focusImage,
      link: "/projects/2"
    },
    {
      id: 3,
      title: "Priority-Pal",
      description: "AI-powered scheduling that adapts to you",
      image: priorityImage,
      link: "/projects/3"
    }
  ];

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

      {/* Featured Projects
      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link to={project.link} key={project.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all">
                <figure><img src={project.image} alt={project.title} /></figure>
                <div className="card-body">
                  <h3 className="card-title text-2xl">{project.title}</h3>
                  <p className="text-lg">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> */}

      {/* Featured Projects */}
<div className="py-20 bg-base-100">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold mb-10 text-center">Featured Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.map((project) => (
        <Link
          to={project.link}
          key={project.id}
          className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all"
        >
          {/* Ensure images are resized uniformly */}
          <figure className="w-full h-48 flex items-center justify-center bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="object-contain w-full h-full"
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title text-2xl">{project.title}</h3>
            <p className="text-lg">{project.description}</p>
          </div>
        </Link>
      ))}
    </div>
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