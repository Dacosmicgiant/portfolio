import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage"

import {Routes, Route} from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App = () => {
  const {authUser, checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        {/* <Route path="/projects:[id]" element={<HomePage />} /> */}
   
      </Routes>
    </div>
  )
};

export default App