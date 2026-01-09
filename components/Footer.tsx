import { Facebook, Instagram, Languages } from "lucide-react";
import Link from "next/link";

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
              <a
                href="#"
                className="w-10 h-10  bg-blue-600 text-white rounded-full flex items-center justify-center transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10  bg-pink-600 text-white rounded-full flex items-center justify-center transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
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
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition text-sm"
                >
                  Terms of Service
                </a>
              </li>
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
