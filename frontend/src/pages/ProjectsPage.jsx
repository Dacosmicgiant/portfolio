import React from "react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Chronicles Unknown",
    description: "A chat-based game exploring alternate timelines using advanced AI/ML and Node.js.",
    link: "/projects/chronicles-unknown",
    image: "https://placehold.co/600x400?text=Chronicles+Unknown",
  },
  {
    title: "Trading Bot",
    description: "An algorithmic trading bot integrating live business news for optimized decision-making.",
    link: "/projects/trading-bot",
    image: "https://placehold.co/600x400?text=Trading+Bot",
  },
  {
    title: "StudyGaze",
    description: "Technology that helps users stay mindful of their video attention using real-time feedback.",
    link: "/projects/studygaze",
    image: "https://placehold.co/600x400?text=StudyGaze",
  },
  {
    title: "Constitutional Chatbot",
    description: "A domain-specific chatbot providing legal insights and case histories from the Indian Constitution.",
    link: "/projects/constitutional-chatbot",
    image: "https://placehold.co/600x400?text=Constitutional+Chatbot",
  },
  {
    title: "Smartify Home",
    description: "A project to completely digitalize and smartify living spaces inspired by Iron Man's workshop.",
    link: "/projects/smartify-home",
    image: "https://placehold.co/600x400?text=Smartify+Home",
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold text-center mb-12">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              to={project.link}
              key={index}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <figure>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl">{project.title}</h2>
                <p className="text-base-content/70">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
