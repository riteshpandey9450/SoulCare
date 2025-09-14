import { useState } from "react";

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

    // Here you would typically send data to your backend API
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          Have questions, suggestions, or feedback? Reach out to us, and we'll
          get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-4">
            📧 Email: <a href="mailto:support@mindcare.com" className="text-indigo-600">support@mindcare.com</a>
          </p>
          <p className="text-gray-700 mb-4">
            📞 Phone: <a href="tel:+911234567890" className="text-indigo-600">+91 12345 67890</a>
          </p>
          <p className="text-gray-700 mb-4">
            📍 Address: MindCare Campus, Main Street, City, State
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          {submitted && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              ✅ Your message has been sent successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your message..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
