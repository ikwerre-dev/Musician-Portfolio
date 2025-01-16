import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-gray-50 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Lainey Wilson
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-900 hover:text-gray-600">Home</Link>
            <Link to="/about" className="text-gray-900 hover:text-gray-600">About</Link>
            <Link to="/services" className="text-gray-900 hover:text-gray-600">Services</Link>
            <Link to="/store" className="text-gray-900 hover:text-gray-600">Store</Link>
            <Link to="/contact" className="text-gray-900 hover:text-gray-600">Contact</Link>
          </nav>

          <Link to="/contact" className="hidden md:block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
            Contact Me
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden focus:outline-none text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="mt-4 md:hidden bg-gray-50 border-t border-gray-200">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
            <Link
              to="/store"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              Store
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;