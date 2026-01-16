"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "@/dal/blogs/get-blog-by-id";
import { BlogDetailSkeleton } from "./blog-detail-skeleton";
import { BlogError } from "./error-state";
import { BlogNotFound } from "./blog-not-found";

interface BlogDetailProps {
  slug: string;
}

export function BlogDetail({ slug }: BlogDetailProps) {
  const {
    data: blog,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blog-detail", slug],
    queryFn: () => getBlogById({ slug }).then((res) => res),
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

  // Check if description is long enough to split
  const shouldSplitDescription = (description: string): boolean => {
    // Don't split if less than 300 characters or less than 3 sentences
    const sentenceCount = (description.match(/[.!?]+/g) || []).length;
    return description.length >= 300 && sentenceCount >= 3;
  };

  // Split description into paragraphs
  const splitDescription = (description: string) => {
    // Split by double newlines first (paragraph breaks)
    let paragraphs = description.split(/\n\n+/);

    // If no double newlines, try single newlines
    if (paragraphs.length === 1) {
      paragraphs = description.split(/\n+/);
    }

    // If still one paragraph, try to split by sentences
    if (paragraphs.length === 1) {
      // Split by periods followed by space and capital letter
      const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];

      // Group sentences into two halves
      const midpoint = Math.ceil(sentences.length / 2);
      return {
        beforeImages: sentences.slice(0, midpoint).join(" ").trim(),
        afterImages: sentences.slice(midpoint).join(" ").trim(),
      };
    }

    // Split paragraphs roughly in half
    const midpoint = Math.ceil(paragraphs.length / 2);
    return {
      beforeImages: paragraphs.slice(0, midpoint).join("\n\n").trim(),
      afterImages: paragraphs.slice(midpoint).join("\n\n").trim(),
    };
  };

  const renderParagraphs = (text: string) => {
    const paragraphs = text.split(/\n+/);
    return paragraphs.map((para, idx) => (
      <p
        key={idx}
        className="text-gray-700 leading-[1.8] text-lg font-light tracking-wide mb-8 last:mb-0"
      >
        {para}
      </p>
    ));
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

          {/* Content Layout - Smart Split */}
          {blog.images &&
          blog.images.length > 0 &&
          shouldSplitDescription(blog.description) ? (
            <>
              {/* First Part of Description (Before Images) */}
              <div className="prose prose-lg max-w-none mb-16 pb-16 border-b border-gray-200">
                {renderParagraphs(
                  splitDescription(blog.description).beforeImages
                )}
              </div>

              {/* Images Gallery */}
              <div className="mb-16">
                {blog.images.length === 1 && (
                  <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-sm">
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
                        className="relative aspect-4/3 bg-gray-100 overflow-hidden rounded-sm"
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
                    <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-sm">
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
                          className="relative aspect-4/3 bg-gray-100 overflow-hidden rounded-sm"
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

              {/* Second Part of Description (After Images) */}
              <div className="prose prose-lg max-w-none">
                {renderParagraphs(
                  splitDescription(blog.description).afterImages
                )}
              </div>
            </>
          ) : (
            /* Short Description or No Images - Show Everything Together */
            <>
              <div className="prose prose-lg max-w-none mb-16 pb-16 border-b border-gray-200">
                {renderParagraphs(blog.description)}
              </div>

              {/* Images Gallery (if exists) */}
              {blog.images && blog.images.length > 0 && (
                <div className="mb-16">
                  {blog.images.length === 1 && (
                    <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-sm">
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
                          className="relative aspect-4/3 bg-gray-100 overflow-hidden rounded-sm"
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
                      <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-sm">
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
                            className="relative aspect-4/3 bg-gray-100 overflow-hidden rounded-sm"
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
            </>
          )}
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
