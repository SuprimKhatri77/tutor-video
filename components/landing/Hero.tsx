import { ChevronRight, MessageCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

export const Hero = () => {
  return (
    <section
      id="home"
      className="pt-36 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center flex-col 
    "
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 z-30">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
          Master German from <span className="text-blue-600">Nepal</span>
          <br />
          Your Journey to <span className="text-red-600">Germany</span>
        </h1>
        <Badge className="bg-blue-600">Starts Here</Badge>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Professional language training for students online. Learn A1 to B2
          levels with personalized guidance from me.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/videos"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            Start Learning
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>

          <a
            href="https://wa.me/+4915221553164"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-white border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center shadow hover:shadow-md">
              <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
              Chat on WhatsApp
            </button>
          </a>
        </div>

        {/* Trust Badge */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white"></div>
            <div className="w-10 h-10 rounded-full bg-green-400 border-2 border-white"></div>
            <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-white"></div>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            Trusted by 500+ students
          </p>
        </div>
      </div>
      {/* Background pattern */}
      <div
        className="absolute inset-0 -z-50
             bg-[#f5f5ff]
             bg-[linear-gradient(-45deg,#f5f5ff,#f5f5ff_50%,#dbe0ff_50%,#dbe0ff)]
             bg-size-[20px_20px]
              opacity-[0.3]
               pointer-events-none"
      ></div>
    </section>
  );
};
