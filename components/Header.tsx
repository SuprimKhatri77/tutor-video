"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
    label: "Events",
    link: "upcoming-events",
  },

  {
    label: "Contact",
    link: "contact",
  },
  {
    label: "Blogs",
    link: "blogs",
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const location = usePathname();
  const currentPath = location.split("/")[1];
  return (
    <motion.header
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="fixed w-full z-50 backdrop-blur-md bg-white/30 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-2 h-16">
        {/* Logo / Name */}
        <Link href="/" className=" text-2xl font-bold ">
          <Image
            src="/logo-transparent.png"
            alt="TutorDai"
            width={100}
            height={100}
          />
        </Link>

        {/* Desktop NavBar */}
        <nav className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((nav) => (
            <Link
              key={nav.label}
              href={`/${nav.link}`}
              className={cn(
                "text-gray-800 font-medium hover:text-blue-500 transition",
                nav.link.toLowerCase() === currentPath.toLowerCase()
                  ? "text-blue-600"
                  : nav.label === "Home" &&
                      currentPath === "" &&
                      "text-blue-600"
              )}
            >
              {nav.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden  text-gray-800 focus:outline-none transition-all ease-in duration-200"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            className="md:hidden bg-white/80  shadow-md"
            key={"navbar"}
          >
            <nav className="flex flex-col items-center space-y-4 py-4 min-h-screen w-1/2 ml-auto backdrop-blur-sm">
              {NAV_ITEMS.map((nav, idx) => (
                <MotionLink
                  initial={{ opacity: 0, y: -5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 * idx, ease: "easeIn" }}
                  key={nav.label}
                  href={`/${nav.link}`}
                  className={cn(
                    "text-gray-800 font-medium hover:text-blue-500 transition",
                    nav.link.toLowerCase() === currentPath.toLowerCase()
                      ? "text-blue-600"
                      : nav.label === "Home" &&
                          currentPath === "" &&
                          "text-blue-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {nav.label}
                </MotionLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
