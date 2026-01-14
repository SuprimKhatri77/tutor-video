"use client";

import Link from "next/link";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { BlogSkeleton } from "./blog-skeleton";
import { ErrorState } from "./blog-error-state";
import { EmptyState } from "./blog-empty-state";
import { getBlogsPaginated } from "@/dal/blogs/get-blogs-paginated";

export function BlogList() {
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["all-blogs-infinite"],
    queryFn: ({ pageParam = 0 }) => getBlogsPaginated(pageParam, 3), // 3 blogs per page
    getNextPageParam: (lastPage, allPages) => {
      // If we got fewer blogs than requested, we've reached the end
      if (lastPage.blogs.length < 3) return undefined;

      // Return the next page number
      // the returned result from the getBlogsPaginated() func is pushed inside an array which looks like this [{blogs:[blog1,...]}] so when we do allPages.length it is 1 at first
      return allPages.length;
    },
    // the initial page params.
    initialPageParam: 0,
    // The time until the cache is considered fresh.
    staleTime: 1000 * 60 * 60,
    /* gc time is the actual time up until when the cache is there in the memory , if the gc time is crossed when we get to the page again the fetch happens even so the stale time is not crossed yet. It's so because stale times checks the cache but there's no cache since the gcTime expired so it fetches again.

    Ideally the gcTime is less than or equal to staleTime because say if there is no staleTIme set it defaults to 0 , and say we have gcTime of 1hr even so there's cache for an hour the query will still fetch it again since the cache is considered stale.
    */

    gcTime: 1000 * 60 * 15,
  });

  // Intersection Observer for infinite scroll
  useEffect(() => {
    // IntersectionObserver is a browser element that notices when an element is visible on the page.
    const observer = new IntersectionObserver(
      (entries) => {
        // entries[0].isIntersecting is true when the currentTarget is there, hasNextPage value comes from the return of getNextPageParams()
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      /* 
      threshold determins at what % of visiblty of the element should we fetch again.
      0.1 = 10%
      */
      { threshold: 0.1 }
    );

    // we set the current target to the ref's target
    const currentTarget = observerTarget.current;
    if (currentTarget) {
      // if there is currentTarget then we set the observer to observer that element on page, if it is visible and the if check in the observer resolves to true then next page is fetched.
      observer.observe(currentTarget);
    }

    /* 
    this is a cleanup return function, whent he component is unmounted it remvoes the observer.
    unmounting happens when we navigate to another page or so and mounting happens when we enter the page.
    */
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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

  /* 
  The output of the userInfiniteQuery is in the shape of: 

  data.pages = [

  {blogs:[blog1,blog2,blog3]}(first page), 
  {blogs: [blog4,blog5,blog6]}(second page),

  pageParams:[0,1....]
  ]

  so to extract the blogs from this we faltMap and convert the nested array to one single array.
  The final output looks like:
  
  allBlogs = [blog0, blog1, blog2, blog3, blog4, blog5]

  */
  console.log("pages in data: ", data?.pages);
  const allBlogs = data?.pages.flatMap((page) => page.blogs) ?? [];
  console.log("all blogs: ", allBlogs);

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
        {/* Initial Loading State */}
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
        {!isPending && !isError && allBlogs.length === 0 && <EmptyState />}

        {/* Blogs List */}
        {!isPending && !isError && allBlogs.length > 0 && (
          <>
            <div className="space-y-24">
              {allBlogs.map((blog, index) => (
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
                  {index < allBlogs.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
                  )}
                </article>
              ))}
            </div>

            {/* Intersection Observer Target */}
            <div
              ref={observerTarget}
              className="h-20 flex items-center justify-center"
            >
              {isFetchingNextPage && (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                  <span>Loading more blogs...</span>
                </div>
              )}
              {!hasNextPage && allBlogs.length > 0 && (
                <p className="text-gray-400 text-sm">
                  You&apos;ve reached the end
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
