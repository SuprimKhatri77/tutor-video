import { getBlogById } from "@/dal/blogs/get-blog-by-id";
import { BlogImages } from "./blog-images";

const formatDate = (dateString: Date | string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export async function Blog({ blogId }: { blogId: string }) {
  const blog = await getBlogById({ blogId });
  return blog ? (
    <>
      {/* Article Header */}
      <header className="mb-10">
        <time className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
          {formatDate(blog.createdAt)}
        </time>
        <h1 className="text-5xl font-bold text-black mt-4 mb-6 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold">
            {blog.authorId.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-black">
              Author ID: {blog.authorId}
            </p>
            <p className="text-sm">Updated: {formatDate(blog.updatedAt)}</p>
          </div>
        </div>
      </header>

      {/* Featured Image Gallery */}
      {blog.images && blog.images.length > 0 && (
        <BlogImages images={blog.images} title={blog.title} />
      )}

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
          {blog.description}
        </div>
      </article>
    </>
  ) : (
    <p>Blog record not found.</p>
  );
}
