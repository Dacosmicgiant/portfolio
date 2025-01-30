import React, { useState } from "react";
import { Send, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { trackEvent } from '../lib/analytics';

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
    trackEvent('form_start', '/contact', 'contact_form');
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
  
    try {
      const response = await fetch("https://formspree.io/f/mvgzrgqe", {
        method: "POST",
        body: data,
        mode: 'no-cors',  // Disable CORS for the redirect
      });
  
      // Since we're using 'no-cors', the response can't be accessed directly
      toast.success("Message sent successfully!");
      trackEvent('form_success', '/contact', 'contact_form');
  
      // Clear form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message");
      trackEvent('form_error', '/contact', 'contact_form', {
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Get in Touch</h1>
          <p className="text-center text-base-content/70 mb-8">
            Have a question or want to work together? Feel free to reach out!
          </p>

          <form
            onSubmit={handleSubmit}
            action="https://formspree.io/f/mvgzrgqe"
            method="POST"
            className="space-y-6"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="textarea textarea-bordered h-32"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
