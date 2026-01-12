import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Suspense } from "react";
import { Blog } from "./blog";
import { DeleteBlog } from "./delete-blog";

// type Blog = {
//   id: string;
//   title: string;
//   description: string;
//   authorId: string;
//   images: string[];
//   createdAt: string;
//   updatedAt: string;
// };

// Placeholder data for a single blog
// const PLACEHOLDER_BLOG: Blog = {
//   id: "1",
//   title: "The Future of Web Development in 2025",
//   description:
//     "Exploring the latest trends and technologies shaping the future of web development. From AI integration to serverless architectures, discover what's coming next in the world of modern web applications.\n\nThe landscape of web development is constantly evolving, with new frameworks, tools, and methodologies emerging at a rapid pace. In this comprehensive guide, we'll explore the key trends that are set to define web development in 2025 and beyond.\n\nArtificial Intelligence Integration:\nAI is no longer just a buzzword—it's becoming an integral part of modern web applications. From chatbots and recommendation engines to automated testing and code generation, AI is transforming how we build and interact with websites.\n\nServerless Architecture:\nServerless computing continues to gain traction, allowing developers to focus on writing code without worrying about infrastructure management. This approach offers improved scalability, reduced costs, and faster deployment times.\n\nWeb3 and Blockchain:\nDecentralized applications (dApps) are becoming more mainstream, with blockchain technology enabling new possibilities for secure, transparent, and user-owned web experiences.\n\nPerformance Optimization:\nAs user expectations continue to rise, performance optimization remains crucial. Core Web Vitals, lazy loading, and modern image formats are just some of the techniques developers are using to create lightning-fast experiences.\n\nAccessibility First:\nBuilding inclusive web experiences is no longer optional. WCAG guidelines and accessible design practices are becoming standard requirements for modern web development projects.\n\nConclusion:\nThe future of web development is exciting and full of possibilities. By staying informed about these trends and continuously learning, developers can create innovative, user-friendly applications that stand the test of time.",
//   authorId: "user_123",
//   images: [
//     "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
//     "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
//     "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
//   ],
//   createdAt: "2025-01-05T10:30:00Z",
//   updatedAt: "2025-01-05T10:30:00Z",
// };

export default function BlogDetailPage({ blogId }: { blogId: string }) {
  // const [blog] = useState<Blog>(PLACEHOLDER_BLOG);

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
