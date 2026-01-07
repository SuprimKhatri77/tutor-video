"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-white/30 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo / Name */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Tutor Dai
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {["Home", "Videos", "Contact", "About"].map((link) => (
            <a
              key={link}
              href={link === "Videos" ? "/videos" : `#${link.toLowerCase()}`}
              className="relative text-gray-800 font-medium hover:text-blue-500 transition"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md shadow-md">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {["Home", "Videos", "Contact", "About"].map((link) => (
              <Link
                key={link}
                href={link === "Videos" ? "/videos" : `#${link.toLowerCase()}`}
                className="text-gray-800 font-medium hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)} // close menu on click
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
