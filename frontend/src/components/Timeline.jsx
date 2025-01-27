// Timeline.jsx

import React from 'react';

const Timeline = () => {
  const timelineEvents = [
    {
      year: "2024",
      title: "IBM certified Full-Stack Software Developer Professional",
      description: "Validates expertise in building and deploying full-stack applications using modern technologies, including frontend, backend, cloud, and DevOps tools.",
      category: "Certification"
    },
    {
      year: "2023",
      title: "Web Development Intern - Prodigy InfoTech",
      description: "1 month internship",
      category: "Work"
    },
    {
      year: "2023",
      title: "Code Innovact Hackathon Winner",
      description: "Won 1st Rank for EdTech Domain",
      category: "Achievement"
    },
    {
      year: "2022 - present",
      title: "Pillai College of Engineering",
      description: "B.Tech - Information Technology",
      category: "Education"
    },
    {
      year: "2020-2022",
      title: "St. Mary's Jr. College",
      description: "Higher Secondary School",
      category: "Education"
    },
    {
      year: "2019",
      title: "Inter-School Science Expo Winner",
      description: "Won 1st rank for a robotic vaccum cleaner project",
      category: "Acheivement"
    },
    {
      year: "2008 - 2020",
      title: "Seventh-Day Adventist",
      description: "Middle school and high school",
      category: "Education"
    }
  ];

  return (
    <div className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center">My Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
          
          {/* Timeline events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                    <div className="card-body">
                      <div className="badge badge-primary mb-2">{event.category}</div>
                      <h3 className="card-title text-2xl">{event.title}</h3>
                      <p className="text-lg">{event.description}</p>
                      <div className="card-actions justify-end mt-4">
                        <div className="badge badge-outline">{event.year}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
