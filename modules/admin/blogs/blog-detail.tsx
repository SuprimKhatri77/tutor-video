import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Suspense } from "react";
import { Blog } from "./blog";
import { DeleteBlog } from "./delete-blog";

export default function BlogDetailPage({ blogId }: { blogId: string }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-black font-semibold hover:underline mb-8"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blogs
        </Link>

        {/* Divider */}
        <div className="border-t-2 border-black my-12">
          <Suspense fallback={<Spinner />}>
            <Blog blogId={blogId} />
          </Suspense>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/blogs"
            className="px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
          >
            ← Back to All Blogs
          </Link>
          <Link
            href={`/admin/blogs/edit/${blogId}`}
            className="px-6 py-3 border-2 border-black text-black font-semibold hover:bg-gray-100 transition-colors"
          >
            Edit Blog
          </Link>
          <DeleteBlog blogId={blogId} />
        </div>
      </div>
    </div>
  );
}
