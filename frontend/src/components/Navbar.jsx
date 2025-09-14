import { Link } from "react-router-dom";

export default function Navbar() {
  const role = "student"; // This can be dynamic based on user state
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        MindHaven
      </Link>

      {/* Links */}
      <div className="space-x-6 hidden md:flex">
        <a href={`/${role}-dashboard`} className="hover:text-indigo-600">Dashboard</a>
        <a href="/about" className="hover:text-indigo-600">About</a>
        <a href="/contact" className="hover:text-indigo-600">Contact</a>
        <a href="/resources" className="hover:text-indigo-600">Resources</a>
        <a href="/profile" className="hover:text-indigo-600">Profile</a>
      </div>

      {/* CTA Button */}
      <Link to="/auth">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Get Started
        </button>
      </Link>
    </nav>
  );
}
