import { getBlogById } from "@/dal/blogs/get-blog";
import { BlogImages } from "@/modules/admin/blogs/blog-images";
import { formatDistanceToNow } from "date-fns";

export default async function BlogPageClient({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;

  if (!blogId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Missing Blog ID
          </h1>
          <p className="text-gray-500">
            The blog identifier is missing from the URL.
          </p>
        </div>
      </div>
    );
  }

  const blog = await getBlogById(blogId);

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Blog Not Found</h1>
          <p className="text-gray-500">
            We couldn&apos;t find a blog with ID:{" "}
            <span className="font-mono">{blogId}</span>
          </p>
        </div>
      </div>
    );
  }
  console.log("blog images: ", blog.images, blog.images?.length);

  const timeAgo = formatDistanceToNow(new Date(blog.createdAt), {
    addSuffix: true,
  });

  return (
    <main className="min-h-screen bg-white py-10">
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
            <time dateTime={blog.createdAt.toISOString()}>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight mb-6 tracking-tight">
            {blog.title}
          </h1>
        </header>

        {/* Featured Image */}
        {blog.images && blog.images.length > 0 && (
          <BlogImages title={blog.title} images={blog.images} />
        )}

        {/* Content Section */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-relaxed text-lg space-y-6 whitespace-pre-wrap">
            {blog.description}
          </div>
        </div>

        {/* Footer Metadata */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Published{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            {blog.updatedAt.getTime() !== blog.createdAt.getTime() && (
              <div>
                Updated{" "}
                {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
        </footer>
      </article>
    </main>
  );
}
