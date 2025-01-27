// ContactPage.jsx

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <div className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-4rem)]">
          <div className="max-w-3xl mx-auto">
            {/* <h1 className="text-4xl font-bold text-center mb-10">Get in Touch</h1> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Contact Info */}
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Location</h3>
                      <p>Mumbai, India</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p>contact@example.com</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Social Media</h3>
                      <div className="flex gap-4">
                        <a href="#" className="link link-primary">
                          LinkedIn
                        </a>
                        <a href="#" className="link link-primary">
                          GitHub
                        </a>
                        <a href="#" className="link link-primary">
                          Twitter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Send Message</h2>
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
                      className="input input-bordered"
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
                      placeholder="Your email"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Subject</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      className="input input-bordered"
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
                    ></textarea>
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
