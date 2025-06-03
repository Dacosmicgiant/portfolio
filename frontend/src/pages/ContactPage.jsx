// ContactPage.jsx
import React, { useState } from "react";
import { Send, Loader, Mail, User, MessageSquare, Phone, MapPin, Globe, Heart } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/messages", formData);
      console.log("Message sent:", response.data);
      toast.success("Message sent successfully!");
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Drop me a line anytime",
      value: "vedant.vankar@example.com",
      color: "primary",
      href: "mailto:vedant.vankar@example.com"
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Call for immediate response",
      value: "+91 98765 43210",
      color: "secondary",
      href: "tel:+919876543210"
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Based in Mumbai, India",
      value: "Mumbai, Maharashtra",
      color: "accent",
      href: "https://maps.google.com/?q=Mumbai,Maharashtra"
    },
    {
      icon: Globe,
      title: "Timezone",
      description: "Available during IST hours",
      value: "UTC +5:30",
      color: "info",
      href: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-info/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                <MessageSquare className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Get in Touch
            </h1>
          </div>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-8">
            Have a project in mind? Want to collaborate? Or just want to say hello? 
            I'd love to hear from you and discuss how we can work together.
          </p>
          
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent to-primary"></div>
            <Heart className="w-6 h-6 text-accent animate-pulse" />
            <div className="w-20 h-1 bg-gradient-to-l from-transparent to-secondary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="relative">
            {/* Gradient Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur opacity-50"></div>
            
            <div className="relative card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-primary/20">
              <div className="card-body p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Send className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Send a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base-content/80">Your Name</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-primary/60" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="input input-bordered w-full pl-12 bg-base-100/50 focus:border-primary focus:bg-base-100 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base-content/80">Email Address</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-secondary/60" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="input input-bordered w-full pl-12 bg-base-100/50  focus:border-secondary focus:bg-base-100 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base-content/80">Your Message</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-accent/60" />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, ideas, or just say hello..."
                        className="textarea textarea-bordered h-32 w-full pl-12 pt-4 bg-base-100/50 focus:border-accent focus:bg-base-100 transition-all duration-300 resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-content border-0 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                    <div className="relative flex items-center gap-2">
                      {loading ? (
                        <>
                          <Loader className="animate-spin h-5 w-5" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-secondary/20 mb-8">
              <div className="card-body p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-secondary" />
                  Let's Connect
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  I'm always excited to work on interesting projects and meet amazing people. 
                  Whether you have a specific project in mind or just want to explore possibilities, 
                  I'm here to help bring your ideas to life.
                </p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className={`card bg-gradient-to-br from-base-100 to-base-200 shadow-lg border border-${method.color}/20 hover:border-${method.color}/40 transition-all duration-300 hover:scale-105 group`}
                  >
                    <div className="card-body p-6 text-center">
                      <div className={`p-3 bg-${method.color}/20 rounded-full w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-6 h-6 text-${method.color}`} />
                      </div>
                      <h4 className="font-bold text-base-content mb-1">{method.title}</h4>
                      <p className="text-xs text-base-content/60 mb-2">{method.description}</p>
                      {method.href ? (
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-medium text-${method.color} hover:underline`}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span className={`text-sm font-medium text-${method.color}`}>
                          {method.value}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response Time */}
            <div className="card bg-gradient-to-r from-success/10 via-info/10 to-warning/10 border border-success/20">
              <div className="card-body p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="font-semibold text-success">Quick Response</span>
                </div>
                <p className="text-sm text-base-content/70">
                  I typically respond within 24 hours during weekdays
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 max-w-2xl mx-auto">
            <div className="card-body p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Something Amazing?</h3>
              <p className="text-base-content/70 mb-6">
                Every great project starts with a conversation. Let's discuss your ideas and create something remarkable together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:vedant.vankar@example.com" className="btn btn-primary gap-2">
                  <Mail size={20} />
                  Email Me
                </a>
                <a href="tel:+919876543210" className="btn btn-secondary gap-2">
                  <Phone size={20} />
                  Call Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;