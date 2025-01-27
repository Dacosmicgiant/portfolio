// ProjectDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";

export const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  if (!project) {
    return <div className="text-center mt-20">Project not found.</div>;
  }

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold mb-8">{project.title}</h1>
        <img src={project.image} alt={project.title} className="rounded-lg shadow-lg mb-8" />
        <p className="text-lg">{project.description}</p>
      </div>
    </div>
  );
};
