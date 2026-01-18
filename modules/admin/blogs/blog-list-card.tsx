import { getAllBlogs } from "@/dal/blogs/get-all-blogs";
import Image from "next/image";
import Link from "next/link";

const truncateText = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

const formatDate = (dateString: Date | string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export async function Blogs() {
  const blogs = await getAllBlogs();
  return blogs && blogs.length > 0 ? (
    blogs.map((blog) => (
      <article
        key={blog.id}
        className="border-2 border-black overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        {/* Featured Image */}
        {blog.images && blog.images.length > 0 && (
          <div className="relative h-64 w-full bg-gray-100">
            <Image
              src={blog.images[0]}
              alt={blog.title}
              fill
              className="object-cover"
            />
            {blog.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 text-sm font-semibold">
                +{blog.images.length - 1} more
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <time className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
            {formatDate(blog.createdAt)}
          </time>

          {/* Title */}
          <h2 className="text-2xl font-bold text-black mt-3 mb-3 line-clamp-2">
            {blog.title}
          </h2>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {truncateText(blog.description)}
          </p>

          {/* See More Button */}
          <Link
            href={`/admin/blogs/${blog.id}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 font-semibold  transition-colors"
          >
            See More →
          </Link>
        </div>
      </article>
    ))
  ) : (
    <div className="text-center py-20">
      <div className="border-2 border-black inline-block p-12">
        <h3 className="text-2xl font-bold text-black mb-3">No blogs yet</h3>
        <p className="text-gray-600">Check back later for amazing content!</p>
      </div>
    </div>
  );
}
