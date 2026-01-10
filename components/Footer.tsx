import {  Languages } from "lucide-react";
import Link from "next/link";
import {  FaTiktok, FaYoutube } from "react-icons/fa";

const Quick_Links_Items = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Videos",
    link: "/videos",
  },

  {
    label: "Contact",
    link: "/contact",
  },
];

const Legal_Item_Links = [
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Terms of Service",
    link: "/terms-of-service",
  }
];


const Social_Items = [
  {
    link: "https://www.tiktok.com/@tutordai?is_from_webapp=1&sender_device=pc",
    icon: FaTiktok,
  },
  {
    link: "https://youtube.com/@tutordai?si=M6O0CwELOJgEROFv",
    icon: FaYoutube,
  },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Languages className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                German with Vikas
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering Nepali students to achieve their German dreams through
              quality language education.
            </p>
            <div className="flex space-x-3">
              {
                Social_Items.map((item)=>{
                const Icon = item.icon
                return  <a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10  border-black border rounded-full flex items-center justify-center transition"
              >
                <Icon className="h-5 w-5" />
              </a>
                })
              }
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {Quick_Links_Items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className="text-gray-600 hover:text-blue-600 transition text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Videos */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">
              Videos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition text-sm"
                >
                  A1 Beginner
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition text-sm"
                >
                  A2 Elementary
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition text-sm"
                >
                  B1 Intermediate
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition text-sm"
                >
                  Exam Preparation
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              {Legal_Item_Links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className="text-gray-600 hover:text-blue-600 transition text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            © {String(new Date().getFullYear())} German with Vikas. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
