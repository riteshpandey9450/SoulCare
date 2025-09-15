import { useState } from "react";
import appointmentImage from "../assets/header_img.png";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="relative min-h-screen py-12 px-6 md:px-20 overflow-hidden">

      {/* Background Gradient + Grid */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-400 rounded-full opacity-40 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-sky-100 to-sky-400 rounded-full opacity-30 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-3/4 w-72 h-72 bg-gradient-to-tr from-indigo-100 to-indigo-400 rounded-full opacity-35 translate-y-1/3"></div>
        <div className="absolute bottom-1/3 left-3/4 w-64 h-64 bg-gradient-to-bl from-cyan-100 to-cyan-400 rounded-full opacity-30"></div>
        <div className="absolute top-5/7 right-1/4 w-56 h-56 bg-gradient-to-tl from-blue-100 to-blue-400 rounded-full opacity-25"></div>
      </div>


      <h1 className="text-4xl font-bold text-blue-700 mb-4 ml-120">
        Need expert assistance? <br /> We are here to help you!
      </h1>

      {/* Contact Section */}
      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-8">
        {/* Left Side - Contact Form */}
        <div className="bg-white p-8 rounded-2xl fixed-size  shadow-md border border-gray-200">
          {submitted && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              ✅ Your message has been sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Subject"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 h-52 focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Write your message..."
                required
              />

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side - Contact Info */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-4">
            📧 Email:{" "}
            <a href="mailto:support@mindcare.com" className="text-indigo-600">
              support@mindcare.com
            </a>
          </p>
          <p className="text-gray-700 mb-4">
            📞 Phone:{" "}
            <a href="tel:+911234567890" className="text-indigo-600">
              +91 12345 67890
            </a>
          </p>
          <p className="text-gray-700 mb-4">
            📍 Address: MindCare Campus, Main Street, City, State
          </p>
          <div>
            <img
              src={appointmentImage}
              alt="Doctor consultation"
              className=" rounded-2xl shadow-lg mx-auto w-[500px] h-[400px]  "
            />
          </div>
        </div>
      </div>

      {/* </section> */}

    </div>
  );
}
