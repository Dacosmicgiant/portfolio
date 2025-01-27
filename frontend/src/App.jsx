// App.jsx


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import ThemePage from "./pages/ThemePage";
import ContactPage from "./pages/ContactPage";

import {Routes, Route, Navigate} from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { ProjectDetails } from "./components/ProjectDetails";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/projects" element={authUser ? <ProjectsPage /> : <Navigate to="/login" />} />
        <Route path="/projects/:projectId" element={<ProjectDetails/>} />

        <Route path="/theme" element={authUser ? <ThemePage /> : <Navigate to="/login" />} />
        <Route path="/contact" element={authUser ? <ContactPage /> : <Navigate to="/login" />} />

        
        </Routes>

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default App