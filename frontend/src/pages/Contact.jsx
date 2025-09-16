import { useState } from "react";
import header_img from "../assets/header_img.png";

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
    <div className="relative min-h-screen py-6 md:py-12 px-4 sm:px-6 md:px-20 overflow-hidden">

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

        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-100 to-blue-400 rounded-full opacity-40 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-br from-sky-100 to-sky-400 rounded-full opacity-30 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-3/4 w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-gradient-to-tr from-indigo-100 to-indigo-400 rounded-full opacity-35 translate-y-1/3"></div>
        <div className="absolute bottom-1/3 left-3/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-bl from-cyan-100 to-cyan-400 rounded-full opacity-30"></div>
        <div className="absolute top-5/7 right-1/4 w-28 h-28 sm:w-42 sm:h-42 md:w-56 md:h-56 bg-gradient-to-tl from-blue-100 to-blue-400 rounded-full opacity-25"></div>
      </div>

      {/* Responsive Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-700 mb-4 sm:mb-6 md:mb-8  text-center  leading-tight">
        Need expert assistance? <br className="hidden sm:block" />
        <span className="block sm:inline">We are here to help you!</span>
      </h1>

      {/* Contact Section - Mobile: Right side first, Desktop: Normal order */}
      <div className="grid grid-cols-1 mt-6 sm:mt-8 md:grid-cols-2 gap-6 md:gap-8">

        {/* Right Side - Contact Info (Shows first on mobile) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200 order-1 md:order-2">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-indigo-600 text-center md:text-left">
            Get in Touch
          </h2>

          <div className="space-y-3 sm:space-y-4 mb-6">
            <p className="text-sm sm:text-base text-gray-700 text-center md:text-left">
              📧 Email:{" "}
              <a href="mailto:support@mindcare.com" className="text-indigo-600 hover:underline">
                support@mindcare.com
              </a>
            </p>
            <p className="text-sm sm:text-base text-gray-700 text-center md:text-left">
              📞 Phone:{" "}
              <a href="tel:+911234567890" className="text-indigo-600 hover:underline">
                +91 12345 67890
              </a>
            </p>
            <p className="text-sm sm:text-base text-gray-700 text-center md:text-left">
              📍 Address: MindCare Campus, Main Street, City, State
            </p>
          </div>

          <div className="flex justify-center">
            <div className="rounded-2xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-65 sm:h-64 md:h-80 lg:h-120 overflow-hidden">
              <img
                src={header_img} 
                alt="Doctor Consultation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>


        </div>

        {/* Left Side - Contact Form (Shows second on mobile) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200 order-2 md:order-1">
          <div className="space-y-4 sm:space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base ">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Your Name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Subject"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 h-32 sm:h-40 md:h-52 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-colors"
                placeholder="Write your message..."
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

