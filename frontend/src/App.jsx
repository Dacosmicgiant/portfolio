// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

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

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme, initializeTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme first
    initializeTheme();
    
    // Then check authentication
    checkAuth();
  }, [checkAuth, initializeTheme]);

  // Loading screen with theme-aware styling
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader className="size-12 animate-spin text-primary mx-auto" />
            <div className="absolute inset-0 size-12 animate-pulse bg-primary/20 rounded-full mx-auto"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-base-content">Loading Portfolio</h2>
            <p className="text-base-content/60">Preparing your experience...</p>
          </div>
        </div>
      </div>
    );

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      {/* Enhanced theme-aware background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-200 to-base-300"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

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
      
      {/* Enhanced toast styling with theme awareness */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--b2))',
            color: 'hsl(var(--bc))',
            border: '1px solid hsl(var(--b3))',
            borderRadius: '0.75rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--su))',
              secondary: 'hsl(var(--suc))',
            },
          },
          error: {
            iconTheme: {
              primary: 'hsl(var(--er))',
              secondary: 'hsl(var(--erc))',
            },
          },
        }}
      />
    </div>
  );
};

export default App;