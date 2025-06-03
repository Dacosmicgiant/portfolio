// About.jsx

import React from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiMongodb, SiExpress, SiFlask, SiVite } from "react-icons/si";
import { Code2, Zap, Heart, Target, Lightbulb, Rocket } from "lucide-react";
import aboutImage from "../assets/images/aboutme.png"
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const leftColumnRef = useScrollAnimation();
  const rightColumnRef = useScrollAnimation();
  const skillsRef = useScrollAnimation();

  const skills = [
    { icon: FaHtml5, name: "HTML", color: "text-orange-600", bgColor: "bg-orange-600/20" },
    { icon: FaCss3Alt, name: "CSS", color: "text-blue-600", bgColor: "bg-blue-600/20" },
    { icon: FaJs, name: "JavaScript", color: "text-yellow-500", bgColor: "bg-yellow-500/20" },
    { icon: SiMongodb, name: "MongoDB", color: "text-green-600", bgColor: "bg-green-600/20" },
    { icon: SiExpress, name: "Express", color: "text-gray-700", bgColor: "bg-gray-700/20" },
    { icon: FaReact, name: "React", color: "text-blue-500", bgColor: "bg-blue-500/20" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-500", bgColor: "bg-green-500/20" },
    { icon: SiVite, name: "Vite", color: "text-purple-600", bgColor: "bg-purple-600/20" },
    { icon: FaPython, name: "Python", color: "text-blue-500", bgColor: "bg-blue-500/20" },
    { icon: SiFlask, name: "Flask", color: "text-black", bgColor: "bg-black/20" },
  ];

  const specialties = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "End-to-end web application development with modern technologies",
      color: "primary"
    },
    {
      icon: Zap,
      title: "AI Integration",
      description: "Implementing intelligent features and automation in applications",
      color: "secondary"
    },
    {
      icon: Target,
      title: "Responsive Design",
      description: "Creating beautiful, accessible interfaces that work on all devices",
      color: "accent"
    },
    {
      icon: Lightbulb,
      title: "Database Architecture",
      description: "Designing efficient, scalable database structures and relationships",
      color: "info"
    },
    {
      icon: Rocket,
      title: "API Development",
      description: "Building robust, secure, and well-documented REST APIs",
      color: "success"
    },
    {
      icon: Heart,
      title: "Problem Solving",
      description: "Analytical thinking and creative solutions to complex challenges",
      color: "warning"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-base-100 to-base-200 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                <Code2 className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        {/* Main About Section */}
        <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-primary/20 mb-16">
          <div className="card-body p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column - Text Content */}
              <div ref={leftColumnRef} className="opacity-0 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-base-content">Who Am I?</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-base-content/80 mb-6">
                    I'm a passionate MERN stack developer with a keen interest in
                    AI integration. With a strong foundation in both frontend and
                    backend development, I create seamless, user-centric
                    applications that solve real-world problems.
                  </p>
                  <p className="text-base leading-relaxed text-base-content/70">
                    My journey in technology is driven by curiosity and the desire to build
                    solutions that make a positive impact. I believe in writing clean, 
                    maintainable code and staying updated with the latest industry trends.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-secondary/20 rounded-lg">
                      <Rocket className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-base-content">My Mission</h3>
                  </div>
                  <p className="text-base leading-relaxed text-base-content/70">
                    To bridge the gap between innovative ideas and practical implementation,
                    creating digital solutions that are not only functional but also 
                    intuitive and delightful to use.
                  </p>
                </div>
              </div>

              {/* Right Column - Image */}
              <div ref={rightColumnRef} className="opacity-0 flex items-center justify-center">
                <div className="relative group">
                  {/* Gradient Border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  
                  <div className="relative bg-gradient-to-br from-base-200 to-base-300 rounded-2xl p-2">
                    <img
                      src={aboutImage}
                      alt="Dynamic Representation"
                      className="max-w-xs w-full h-auto object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 p-3 bg-primary/20 rounded-full backdrop-blur-sm animate-bounce">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 p-3 bg-secondary/20 rounded-full backdrop-blur-sm animate-bounce animation-delay-1000">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              What I Do
            </h3>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Specialized skills and services I offer to bring your ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => {
              const IconComponent = specialty.icon;
              return (
                <div
                  key={index}
                  className={`card bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-${specialty.color}/20 hover:border-${specialty.color}/40 transition-all duration-300 hover:scale-105 group`}
                >
                  <div className="card-body p-6">
                    <div className={`p-3 bg-${specialty.color}/20 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 text-${specialty.color}`} />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{specialty.title}</h4>
                    <p className="text-base-content/70 text-sm leading-relaxed">
                      {specialty.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Enhanced Skills Section */}
        <div 
          ref={skillsRef}
          className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-accent/20 opacity-0"
        >
          <div className="card-body p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-accent to-info bg-clip-text text-transparent">
                  Technical Skills
                </h3>
              </div>
              <p className="text-base-content/70 max-w-2xl mx-auto">
                Technologies and tools I use to build amazing digital experiences
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-base-200/50 to-base-300/50 hover:from-base-200 hover:to-base-300 border border-base-content/10 hover:border-primary/30 transition-all duration-300 hover:scale-110"
                  >
                    <div className={`p-4 ${skill.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`text-4xl ${skill.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <span className="text-sm font-semibold text-center group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Additional Skills Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-info/10 to-success/10 rounded-2xl border border-info/20">
                <div className="text-2xl font-bold text-info mb-2">3+</div>
                <div className="text-sm text-base-content/70">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-warning/10 to-error/10 rounded-2xl border border-warning/20">
                <div className="text-2xl font-bold text-warning mb-2">{skills.length}+</div>
                <div className="text-sm text-base-content/70">Technologies</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-success/10 to-primary/10 rounded-2xl border border-success/20">
                <div className="text-2xl font-bold text-success mb-2">∞</div>
                <div className="text-sm text-base-content/70">Learning Journey</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;