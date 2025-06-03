// SignUpPage.jsx

import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User, UserPlus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen pt-4 bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex justify-center items-center relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-info/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-success/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>

      <div className="w-full max-w-6xl flex justify-center items-center p-4 relative z-10">
        <div className="w-full max-w-md relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-accent to-info rounded-3xl blur opacity-75 animate-pulse"></div>

          <div className="relative card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-secondary/20">
            <div className="card-body p-6 space-y-6">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="flex flex-col items-center gap-3 group">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-secondary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative p-3 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <UserPlus className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      Create Account
                    </h1>
                    <p className="text-sm text-base-content/60">Join the portfolio experience</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text font-medium text-base-content/80 text-sm">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-info/60" />
                    </div>
                    <input
                      type="text"
                      className="input input-sm input-bordered w-full pl-10 bg-base-100/50 focus:border-info focus:bg-base-100"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text font-medium text-base-content/80 text-sm">Email Address</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-secondary/60" />
                    </div>
                    <input
                      type="email"
                      className="input input-sm input-bordered w-full pl-10 bg-base-100/50 focus:border-secondary focus:bg-base-100"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text font-medium text-base-content/80 text-sm">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-accent/60" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-sm input-bordered w-full pl-10 pr-10 bg-base-100/50 focus:border-accent focus:bg-base-100"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-base-content/40" /> : <Eye className="h-4 w-4 text-base-content/40" />}
                    </button>
                  </div>
                </div>

                {/* Password Strength */}
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[2, 4, 6, 8].map((len, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${formData.password.length >= len ? ['bg-error', 'bg-warning', 'bg-info', 'bg-success'][i] : 'bg-base-300'} transition-colors duration-300`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-base-content/60">
                    Password strength: {
                      formData.password.length >= 8 ? 'Strong' :
                      formData.password.length >= 6 ? 'Good' :
                      formData.password.length >= 4 ? 'Fair' :
                      formData.password.length >= 2 ? 'Weak' : 'Too short'
                    }
                  </p>
                </div>

                {/* Submit */}
                <button 
                  type="submit" 
                  className="btn btn-sm w-full bg-gradient-to-r from-secondary to-accent text-secondary-content border-0 relative overflow-hidden group"
                  disabled={isSigningUp}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-info translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                  <div className="relative flex items-center gap-2 text-sm">
                    {isSigningUp ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Login link */}
              <div className="text-center pt-2 border-t border-base-content/10 text-sm">
                <p className="text-base-content/60">
                  Already have an account?{" "}
                  <Link to="/login" className="link link-secondary font-semibold hover:text-accent transition-colors duration-200">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Decorative Bubbles */}
              <div className="absolute top-4 right-4 opacity-20">
                <div className="w-12 h-12 bg-gradient-to-br from-success/30 to-warning/30 rounded-full"></div>
              </div>
              <div className="absolute bottom-4 left-4 opacity-20">
                <div className="w-10 h-10 bg-gradient-to-br from-error/30 to-info/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
