// Navbar.jsx

import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, Menu, X, Shield } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "About" },
    { path: "/projects", label: "Projects", protected: true },
    { path: "/contact", label: "Contact", protected: true },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-content/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-base-content group-hover:text-primary transition-colors duration-200">
              Dacosmicgiant
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              (!item.protected || authUser) && (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-base-content/5 ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-base-content/70 hover:text-base-content"
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {authUser ? (
              <>
                <Link
                  to="/theme"
                  className="p-2 rounded-lg text-base-content/60 hover:text-base-content hover:bg-base-content/5 transition-all duration-200"
                  title="Theme Settings"
                >
                  <Settings className="w-4 h-4" />
                </Link>
                
                {authUser.isAdmin && (
                  <Link
                    to="/admin"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive("/admin")
                        ? "text-primary bg-primary/10"
                        : "text-base-content/70 hover:text-base-content hover:bg-base-content/5"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-base-content/70 hover:text-error hover:bg-error/10 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-content hover:bg-primary/90 transition-all duration-200"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-base-content/60 hover:text-base-content hover:bg-base-content/5 transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-base-content/5">
            {navItems.map((item) => (
              (!item.protected || authUser) && (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-base-content/70 hover:text-base-content hover:bg-base-content/5"
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
            
            <div className="pt-3 mt-3 border-t border-base-content/5 space-y-1">
              {authUser ? (
                <>
                  <Link
                    to="/theme"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-base-content/70 hover:text-base-content hover:bg-base-content/5 transition-all duration-200"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Theme Settings</span>
                  </Link>
                  
                  {authUser.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive("/admin")
                          ? "text-primary bg-primary/10"
                          : "text-base-content/70 hover:text-base-content hover:bg-base-content/5"
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-base-content/70 hover:text-error hover:bg-error/10 transition-all duration-200 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-content hover:bg-primary/90 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;