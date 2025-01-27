import React from 'react';

const About = () => {
  return (
    <div className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center">About Me</h2>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
                <p className="text-lg mb-6">
                  I'm a passionate MERN stack developer with a keen interest in AI integration. 
                  With a strong foundation in both frontend and backend development, I create 
                  seamless, user-centric applications that solve real-world problems.
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
              <div>
                <h3 className="text-2xl font-semibold mb-4">Skills</h3>
                <div className="space-y-4">
                  {[
                    { name: "Frontend Development", value: 90 },
                    { name: "Backend Development", value: 85 },
                    { name: "Database Management", value: 80 },
                    { name: "AI Integration", value: 75 },
                    { name: "DevOps", value: 70 }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-lg">{skill.name}</span>
                        <span className="text-lg">{skill.value}%</span>
                      </div>
                      <progress 
                        className="progress progress-primary w-full" 
                        value={skill.value} 
                        max="100"
                      ></progress>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
