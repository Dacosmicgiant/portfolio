// LoginPage.jsx

import React from 'react'
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, UserCheck, Sparkles } from "lucide-react";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const { login, isLoggingIn } = useAuthStore();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      login(formData);
    };

    return (
        <div className="h-screen pt-10 bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex justify-center items-center relative overflow-hidden">


          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-info/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
          </div>

          <div className="w-full max-w-6xl flex justify-center items-center p-6 sm:p-12 relative z-10">
            {/* Enhanced Form Container */}
            <div className="w-full max-w-md relative">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur opacity-75 animate-pulse"></div>
              
              <div className="relative card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-primary/20">
                <div className="card-body p-8 space-y-8">
                  {/* Enhanced Header */}
                  <div className="text-center mb-8">
                    <div className="flex flex-col items-center gap-4 group">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                          <UserCheck className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          Welcome Back
                        </h1>
                        <p className="text-base-content/60">Sign in to access your portfolio dashboard</p>
                      </div>
                    </div>
                  </div>
        
                  {/* Enhanced Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-base-content/80">Email Address</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-primary/60" />
                        </div>
                        <input
                          type="email"
                          className="input input-bordered w-full pl-12 bg-base-100/50  focus:border-primary focus:bg-base-100 transition-all duration-300"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
        
                    {/* Password Field */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-base-content/80">Password</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-secondary/60" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="input input-bordered w-full pl-12 pr-12 bg-base-100/50  focus:border-secondary focus:bg-base-100 transition-all duration-300"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-secondary transition-colors duration-200"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-base-content/40" />
                          ) : (
                            <Eye className="h-5 w-5 text-base-content/40" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Enhanced Submit Button */}
                    <button 
                      type="submit" 
                      className="btn w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-content border-0 relative overflow-hidden group"
                      disabled={isLoggingIn}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                      <div className="relative flex items-center gap-2">
                        {isLoggingIn ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-5 w-5" />
                            Sign In
                          </>
                        )}
                      </div>
                    </button>
                  </form>

                  {/* Enhanced Sign-up Link */}
                  <div className="text-center pt-4 border-t border-base-content/10">
                    <p className="text-base-content/60">
                      Don't have an account?{" "}
                      <Link 
                        to="/signup" 
                        className="link link-primary font-semibold hover:text-secondary transition-colors duration-200"
                      >
                        Create account
                      </Link>
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent/30 to-info/30 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-20">
                    <div className="w-16 h-16 bg-gradient-to-br from-warning/30 to-success/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default LoginPage;