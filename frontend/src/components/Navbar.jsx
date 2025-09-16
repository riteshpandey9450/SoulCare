import React, { useState, useEffect } from 'react';
import { Menu, X, User, ChevronDown, Bell, Search, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const role = "student"; // This can be dynamic based on user state
  const [user, setUser] = useState(true);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavLinks = () => {
    const commonLinks = [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/resources", label: "Resources" }
    ];

    switch (role) {
      case "student":
        return [
          { href: `/${role}-dashboard`, label: "Dashboard" },
          ...commonLinks,
        ];
      case "counsellor":
        return [
          { href: `/${role}-dashboard`, label: "Dashboard" },
          ...commonLinks,
        ];
      case "admin":
        return [
          { href: `/${role}-dashboard`, label: "Dashboard" },
          { href: "/manage-counsellors", label: "Manage Counsellors" },
          { href: "/reports", label: "Student Report" }
        ];
      default:
        return commonLinks;
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <a 
              href="/" 
              className="flex items-center space-x-1 group"
            >
              <img src="Logo.png" alt="SoulCare" className="w-16 h-16" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SoulCare
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="relative px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">

              {/* Profile Dropdown */}
              {user && 
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-all duration-300"
                >
                  <User size={20} />
                  <ChevronDown size={16} className={`transform transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {role !== "admin" &&
                    <>
                      <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                        View Profile
                      </a>
                      <hr className="my-2 border-gray-200" />
                    </>
                    }
                    <button onClick={() => setUser(false)} className="block px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200">
                      <LogOut size={20} className='inline-block mr-2'/> Logout
                    </button>
                  </div>
                )}
              </div>
              }

              {/* CTA Button */}
              {!user && <a href="/auth">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
                  Get Started
                </button>
              </a>}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white border-t border-gray-200 px-4 py-6 space-y-4">

            {/* Mobile Navigation Links */}
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}


            {/* Mobile Profile Section */}
            {user &&
              <div className="pt-6 border-t border-gray-200 space-y-3">
                {
                  role !== "admin" &&
                  <a
                    href="/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
                  >
                    <User size={20} />
                    <span className="font-medium">Profile</span>
                  </a>
                }

                <button
                  onClick={() => setUser(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            }
            </div>

            {/* Mobile CTA Button */}
            {!user && 
            <a href="/auth" className="block">
              <button 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 mb-6 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </button>
            </a>
            }
          </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 lg:h-20"></div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

    </>
  );
}