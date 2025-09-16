export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Side */}
        <p className="text-sm">
          © {new Date().getFullYear()} MindHaven. All rights reserved.
        </p>

        {/* Right Side Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </div>
      </div>
    </footer>
  );
}
