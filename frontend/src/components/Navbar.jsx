// Navbar.jsx

import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, Menu, X } from "lucide-react";
import { trackEvent } from '../lib/analytics';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => {
    return location.pathname === path ? "bg-base-200" : "";
  };

  const trackNavigation = (path, element) => {
    trackEvent('navigation', path, element);
  };

  const handleLogout = () => {
    trackEvent('auth', '/', 'logout');
    logout();
  };

  const toggleMenu = () => {
    const action = isOpen ? 'close' : 'open';
    trackEvent('menu_interaction', window.location.pathname, `mobile_menu_${action}`);
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className="text-lg font-bold">Dacosmicgiant</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" 

            onClick={() => trackNavigation('/', 'desktop_about_link')}
            
            className={`btn btn-ghost btn-sm ${isActive("/")}`}>About</Link>
            <Link to="/projects"

            onClick={() => trackNavigation('/projects', 'desktop_projects_link')} 

            className={`btn btn-ghost btn-sm ${isActive("/projects")}`}>Projects</Link>

            <Link to="/contact"

            onClick={() => trackNavigation('/contact', 'desktop_contact_link')}

            className={`btn btn-ghost btn-sm ${isActive("/contact")}`}>Contact</Link>
            
            <Link to="/theme" 
            onClick={() => trackEvent('theme_interaction', '/theme', 'desktop_theme_button')}
            className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Theme</span>
            </Link>

            {authUser ? (
              <>
                {authUser.isAdmin && (
                  <Link to="/admin" 
                  onClick={() => trackEvent('admin_navigation', '/admin', 'desktop_admin_link')}
                  className={`btn btn-ghost btn-sm gap-2 ${isActive("/admin")}`}>
                    Admin Panel
                  </Link>
                )}
                <button className="btn btn-sm gap-2" onClick={logout}>
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" 
              onClick={() => trackEvent('auth', '/login', 'desktop_login_button')}
              className={`btn btn-sm gap-2 ${isActive("/login")}`}>
                <User className="size-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden btn btn-ghost btn-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className={`btn btn-ghost btn-sm justify-start ${isActive("/")}`}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="/projects"
              onClick={() => {
                trackNavigation('/projects', 'mobile_projects_link');
                closeMenu();
              }}
              className={`btn btn-ghost btn-sm justify-start ${isActive("/projects")}`}
              
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className={`btn btn-ghost btn-sm justify-start ${isActive("/contact")}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link
              to="/theme"
              className="btn btn-ghost btn-sm justify-start gap-2"
              onClick={closeMenu}
            >
              <Settings className="w-4 h-4" />
              Theme
            </Link>

            {authUser ? (
              <>
                {authUser.isAdmin && (
                  <Link
                    to="/admin"
                    className={`btn btn-ghost btn-sm justify-start gap-2 ${isActive("/admin")}`}
                    onClick={closeMenu}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  className="btn btn-ghost btn-sm justify-start gap-2"
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`btn btn-ghost btn-sm justify-start gap-2 ${isActive("/login")}`}
                onClick={closeMenu}
              >
                <User className="size-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
