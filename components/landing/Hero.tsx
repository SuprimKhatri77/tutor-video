"use client";
import {
  ChevronRight,
  MessageCircle,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";
import { LocalTypewriter } from "../TypingComponent";
import UpcomingEventsDialog from "./Upcoming";
import { useQuery } from "@tanstack/react-query";
import { getBlogsPaginated } from "@/dal/blogs/get-blogs-paginated";
import { BlogsSelectType } from "@/db/schema";

// Loading Skeleton Component
const BlogSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="h-56 bg-gray-100"></div>
      <div className="p-6 space-y-3">
        <div className="h-3 bg-gray-100 rounded w-24"></div>
        <div className="h-5 bg-gray-100 rounded w-full"></div>
        <div className="h-5 bg-gray-100 rounded w-4/5"></div>
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-gray-100 rounded"></div>
          <div className="h-3 bg-gray-100 rounded w-11/12"></div>
        </div>
        <div className="flex gap-2 pt-3">
          <div className="h-9 bg-gray-100 rounded flex-1"></div>
          <div className="h-9 bg-gray-100 rounded w-24"></div>
        </div>
      </div>
    </div>
  </div>
);

// Error Component
const BlogError = () => (
  <div className="w-full">
    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <span className="text-red-600 text-xl font-bold">✕</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">
        Couldn&apos;t load blog
      </h3>
      <Link href="/blogs">
        <button className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition mt-3">
          View All Blogs
        </button>
      </Link>
    </div>
  </div>
);

// Latest Blog Card Component
const LatestBlogCard = ({ blog }: { blog: BlogsSelectType }) => {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="w-full group">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Blog Image */}

        {blog.images && blog.images.length > 0 ? (
          <div className="relative h-56 bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
            <Image
              src={blog.images[0]}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-gray-900 text-white text-xs border-0 shadow-lg">
                Latest Post
              </Badge>
            </div>
          </div>
        ) : (
          <h1 className="m-4 inline-flex items-center text-sm sm:text-base font-medium px-3 py-1.5 rounded-full bg-blue-500/15 backdrop-blur-md border border-blue-400/30 text-blue-700 shadow-sm">
            Latest post
          </h1>
        )}

        {/* Blog Content */}
        <div className="p-6">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
            {truncateText(blog.title, 70)}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {truncateText(blog.description, 110)}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link href={`/blogs/${blog.slug}`} className="flex-1">
              <button className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-1.5">
                Read Article
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/blogs">
              <button className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                All Posts
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const {
    data: blog,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["latest-blog"],
    queryFn: () => getBlogsPaginated(0, 1).then((res) => res),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 20,
  });

  // Determine if we should show the blog layout (2 columns)
  const shouldShowBlogLayout = isPending || (blog && blog.blogs.length > 0);
  const hasBlog = !isPending && !isError && blog && blog.blogs.length > 0;

  // If no blog and not loading, show original centered layout
  if (!isPending && !isError && (!blog || blog.blogs.length === 0)) {
    return (
      <section
        id="home"
        className="pt-36 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center flex-col"
      >
        <UpcomingEventsDialog />
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 z-30">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
            Master German from <span className="text-blue-600">Nepal</span>
            <br />
            Your Journey to{" "}
            <LocalTypewriter
              text={"Germany"}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-red-600"
            />
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
          <div className="hidden md:flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
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
  }

  // Show layout with blog (or loading/error states)
  return (
    <section
      id="home"
      className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
    >
      <UpcomingEventsDialog />

      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`grid gap-12 items-center ${
            shouldShowBlogLayout
              ? "lg:grid-cols-[1.2fr_1fr]"
              : "lg:grid-cols-1 justify-items-center"
          }`}
        >
          {/* Left Content */}
          <div
            className={`space-y-6 ${
              !shouldShowBlogLayout ? "text-center max-w-3xl" : "text-left"
            }`}
          >
            {/* Heading */}
            <div className="space-y-3">
              <Badge className="bg-blue-600 text-white border-0 text-xs sm:text-sm">
                🇩🇪 Learn German
              </Badge>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1]">
                Master German
                <br />
                from <span className="text-blue-600">Nepal</span>
              </h1>
              <div className="flex items-center gap-1.5 sm:gap-2 text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold flex-wrap">
                <span className="text-gray-900">Journey to</span>
                <LocalTypewriter
                  text={"Germany"}
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-red-600"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              Learn A1 to B2 with expert guidance. Professional training
              designed for Nepali students heading to Germany.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/videos"
                className="bg-blue-600 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                Start Learning
                <ChevronRight className="ml-1.5 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <a
                href="https://wa.me/+4915221553164"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-200 text-gray-900 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-50 transition flex items-center justify-center"
              >
                <MessageCircle className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                WhatsApp
              </a>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 sm:gap-3 pt-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-500 border-2 border-white"></div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-500 border-2 border-white"></div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-500 border-2 border-white"></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                500+ students trust me
              </p>
            </div>
          </div>

          {/* Right Content - Latest Blog */}
          {isPending && <BlogSkeleton />}
          {isError && <BlogError />}
          {hasBlog && <LatestBlogCard blog={blog.blogs[0]} />}
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[#f5f5ff] bg-[linear-gradient(-45deg,#f5f5ff_50%,#dbe0ff_50%)] bg-size-[20px_20px] opacity-30 pointer-events-none"></div>
    </section>
  );
};
