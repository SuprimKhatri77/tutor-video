"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "@/dal/blogs/get-blog-by-id";
import { BlogDetailSkeleton } from "./blog-detail-skeleton";
import { BlogError } from "./error-state";
import { BlogNotFound } from "./blog-not-found";

interface BlogDetailProps {
  blogId: string;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const {
    data: blog,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blog-detail", blogId],
    queryFn: () => getBlogById(blogId).then((res) => res),
    staleTime: 1000 * 60 * 60,
  });

  const formatDateLong = (dateString: Date | string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white py-20">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Loading State */}
      {isPending && <BlogDetailSkeleton />}

      {/* Error State */}
      {isError && <BlogError error={error} onRetry={() => refetch()} />}

      {/* Not Found State */}
      {!isPending && !isError && !blog && <BlogNotFound />}

      {/* Blog Content */}
      {!isPending && !isError && blog && (
        <article className="max-w-4xl mx-auto px-6 py-16">
          {/* Meta */}
          <div className="border-l-2 border-black pl-6 mb-12">
            <time className="text-sm tracking-wider uppercase text-gray-500">
              {formatDateLong(blog.createdAt)}
            </time>
            {blog.updatedAt !== blog.createdAt && (
              <p className="text-xs text-gray-400 mt-1">
                Updated {formatDateLong(blog.updatedAt)}
              </p>
            )}
          </div>

          {/* Title */}
          <h1 className="text-6xl font-light leading-tight tracking-tight mb-8">
            {blog.title}
          </h1>

          {/* Description */}
          <div className="text-xl text-gray-600 leading-relaxed mb-16 pb-16 border-b border-gray-200">
            {blog.description}
          </div>

          {/* Images Gallery */}
          {blog.images && blog.images.length > 0 && (
            <div className="mb-16">
              {blog.images.length === 1 && (
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <Image
                    src={blog.images[0]}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>
              )}

              {blog.images.length === 2 && (
                <div className="grid grid-cols-2 gap-4">
                  {blog.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-4/3 bg-gray-100 overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${blog.title} - Image ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
              )}

              {blog.images.length >= 3 && (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    <Image
                      src={blog.images[0]}
                      alt={`${blog.title} - Featured`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {blog.images.slice(1).map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-4/3 bg-gray-100 overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`${blog.title} - Image ${idx + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Article Content Placeholder */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              This is where your full blog content would appear. The layout uses
              a clean, readable typography system with generous whitespace and a
              clear visual hierarchy.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each section flows naturally into the next, maintaining the
              minimalist aesthetic while ensuring the content remains engaging
              and easy to digest.
            </p>
          </div>
        </article>
      )}

      {/* Footer Navigation */}
      {!isPending && !isError && blog && (
        <div className="border-t border-gray-200 mt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <Link
              href="/blogs"
              className="inline-flex items-center text-black border-b-2 border-black pb-1 hover:opacity-60 transition-opacity"
            >
              <span className="tracking-wide">View All Articles</span>
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
        </div>
      )}
    </div>
  );
}
