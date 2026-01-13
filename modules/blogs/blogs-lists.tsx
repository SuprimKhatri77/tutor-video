"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "@/dal/blogs/get-all-blogs";
import { BlogSkeleton } from "./blog-skeleton";
import { ErrorState } from "./blog-error-state";
import { EmptyState } from "./blog-empty-state";

export function BlogList() {
  const {
    data: blogs,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-blogs-client"],
    queryFn: () => getAllBlogs().then((res) => res),
    staleTime: 1000 * 60 * 60,
  });

  const truncateText = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white py-20">
      {/* Header */}
      <header className="border-b border-black">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-5xl font-light tracking-tight">Blog</h1>
          <p className="mt-2 text-gray-600 text-lg">
            Thoughts, stories, and ideas
          </p>
        </div>
      </header>

      {/* Blog Grid */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Loading State */}
        {isPending && (
          <div className="space-y-24">
            {[0, 1, 2].map((i) => (
              <BlogSkeleton key={i} index={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && <ErrorState error={error} onRetry={() => refetch()} />}

        {/* Empty State */}
        {!isPending && !isError && blogs && blogs.length === 0 && (
          <EmptyState />
        )}

        {/* Blogs List */}
        {!isPending && !isError && blogs && blogs.length > 0 && (
          <div className="space-y-24">
            {blogs.map((blog, index) => (
              <article key={blog.id} className="group relative">
                <div className="grid md:grid-cols-12 gap-12 items-start">
                  {/* Content */}
                  <div
                    className={`md:col-span-7 ${
                      index % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <time className="text-sm tracking-wider uppercase text-gray-500">
                      {formatDate(blog.createdAt)}
                    </time>

                    <h2 className="mt-4 text-4xl font-light leading-tight tracking-tight group-hover:opacity-70 transition-opacity">
                      {blog.title}
                    </h2>

                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                      {truncateText(blog.description)}
                    </p>

                    <Link
                      href={`/blogs/${blog.id}`}
                      className="inline-flex items-center mt-8 text-black border-b-2 border-black pb-1 hover:opacity-60 transition-opacity"
                    >
                      <span className="tracking-wide">Read Article</span>
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* Image */}
                  <div
                    className={`md:col-span-5 ${
                      index % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    {blog.images && blog.images.length > 0 && (
                      <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                        <Image
                          fill
                          src={blog.images[0]}
                          alt={blog.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                {index < blogs.length - 1 && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
