// About.jsx

import React from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiMongodb, SiExpress, SiFlask, SiVite } from "react-icons/si";
import aboutImage from "../assets/images/aboutme.png"

const About = () => {
  return (
    <div className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
                <p className="text-lg mb-6">
                  I'm a passionate MERN stack developer with a keen interest in
                  AI integration. With a strong foundation in both frontend and
                  backend development, I create seamless, user-centric
                  applications that solve real-world problems.
                </p>
                <h3 className="text-2xl font-semibold mb-4">What I Do</h3>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>Full-stack Web Development</li>
                  <li>AI Integration</li>
                  <li>Responsive Design</li>
                  <li>Database Architecture</li>
                  <li>API Development</li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={aboutImage}
                  alt="Dynamic Representation"
                  className="max-w-xs w-full h-auto object-contain rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="text-2xl font-semibold mb-6 text-center">Skills</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center">
                <FaHtml5 className="text-5xl text-orange-600" />
                <span className="text-lg mt-2">HTML</span>
              </div>
              <div className="flex flex-col items-center">
                <FaCss3Alt className="text-5xl text-blue-600" />
                <span className="text-lg mt-2">CSS</span>
              </div>
              <div className="flex flex-col items-center">
                <FaJs className="text-5xl text-yellow-500" />
                <span className="text-lg mt-2">JavaScript</span>
              </div>
              <div className="flex flex-col items-center">
                <SiMongodb className="text-5xl text-green-600" />
                <span className="text-lg mt-2">MongoDB</span>
              </div>
              <div className="flex flex-col items-center">
                <SiExpress className="text-5xl text-gray-700" />
                <span className="text-lg mt-2">Express</span>
              </div>
              <div className="flex flex-col items-center">
                <FaReact className="text-5xl text-blue-500" />
                <span className="text-lg mt-2">React</span>
              </div>
              <div className="flex flex-col items-center">
                <FaNodeJs className="text-5xl text-green-500" />
                <span className="text-lg mt-2">Node.js</span>
              </div>
              <div className="flex flex-col items-center">
                <SiVite className="text-5xl text-purple-600" />
                <span className="text-lg mt-2">Vite</span>
              </div>
              <div className="flex flex-col items-center">
                <FaPython className="text-5xl text-blue-500" />
                <span className="text-lg mt-2">Python</span>
              </div>
              <div className="flex flex-col items-center">
                <SiFlask className="text-5xl text-black" />
                <span className="text-lg mt-2">Flask</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
