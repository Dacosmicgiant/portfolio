// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ThemePage from "./pages/ThemePage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { usePageTracking } from './hooks/useAnalytics';

import React, { useState } from 'react';

import LocationPrompt from './components/LocationPrompt';
import { trackEvent } from './lib/analytics';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationUpdate = (location) => {
    setUserLocation(location);
    // Update all future analytics calls with the location
    localStorage.setItem('userLocation', JSON.stringify(location));
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  usePageTracking();

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <LocationPrompt onLocationUpdate={handleLocationUpdate} />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/projects"
          element={authUser ? <ProjectsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/:id"
          element={<ProjectDetailPage />}
        />
        <Route
          path="/theme"
          element={authUser ? <ThemePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={authUser ? <ContactPage /> : <Navigate to="/login" />}
        />
        <Route path="/admin" element={authUser?.isAdmin === true ? <AdminPage /> : <Navigate to="/" />} />
      </Routes>

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default App

// App.jsx
