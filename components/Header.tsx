"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
const MotionLink = motion(Link);

const NAV_ITEMS: { label: string; link: string }[] = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Videos",
    link: "videos",
  },
  {
    label: "About",
    link: "/#about",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const pathname = usePathname();
  const router = useRouter();

  const handleAboutClick = () => {
    if (pathname === "/") {
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      router.push("/#about");
    }
  };

  return (
    <motion.header
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="fixed w-full z-50 backdrop-blur-md bg-white/30 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo / Name */}
        <Link href="/" className="text-2xl font-bold ">
          TutorDai
        </Link>

        {/* Desktop NavBar */}
        <nav className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((nav) =>
            nav.label !== "/#about" ? (
              <Link
                key={nav.label}
                href={nav.link}
                className="relative text-gray-800 font-medium hover:text-blue-500 transition"
              >
                {nav.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            ) : (
              <Button
                key={nav.label}
                onClick={handleAboutClick}
                className="relative text-gray-800 font-medium hover:text-blue-500 transition"
              >
                {nav.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Button>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none transition-all ease-in duration-200"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn" }}
          className="md:hidden bg-white/80  shadow-md"
        >
          <nav className="flex flex-col items-center space-y-4 py-4 backdrop-blur-md">
            {NAV_ITEMS.map((nav, idx) =>
              nav.link !== "/#contact" ? (
                <MotionLink
                  initial={{ opacity: 0, y: -5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 * idx, ease: "easeIn" }}
                  key={nav.label}
                  href={nav.link}
                  className="text-gray-800 font-medium hover:text-blue-500 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {nav.label}
                </MotionLink>
              ) : (
                <Button
                  key={nav.label}
                  onClick={handleAboutClick}
                  className="relative text-gray-800 font-medium hover:text-blue-500 transition"
                >
                  {nav.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                </Button>
              )
            )}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};
