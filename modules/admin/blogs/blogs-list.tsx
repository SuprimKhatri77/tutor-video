import { Suspense } from "react";
import { Blogs } from "./blog-list-card";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// type Blog = {
//   id: string;
//   title: string;
//   description: string;
//   authorId: string;
//   images: string[];
//   createdAt: string;
//   updatedAt: string;
// };

// Placeholder data
// const PLACEHOLDER_BLOGS: Blog[] = [
//   {
//     id: "1",
//     title: "The Future of Web Development in 2025",
//     description:
//       "Exploring the latest trends and technologies shaping the future of web development. From AI integration to serverless architectures, discover what's coming next in the world of modern web applications. We'll dive deep into emerging frameworks, best practices, and how to stay ahead of the curve in this rapidly evolving field.",
//     authorId: "user_123",
//     images: [
//       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
//     ],
//     createdAt: "2025-01-05T10:30:00Z",
//     updatedAt: "2025-01-05T10:30:00Z",
//   },
//   {
//     id: "2",
//     title: "Building Scalable Applications with Modern Architecture",
//     description:
//       "Learn how to design and build applications that can scale to millions of users. This comprehensive guide covers microservices, load balancing, database optimization, and more. We'll explore real-world case studies and provide actionable insights you can implement today.",
//     authorId: "user_456",
//     images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"],
//     createdAt: "2025-01-04T14:20:00Z",
//     updatedAt: "2025-01-04T14:20:00Z",
//   },
//   {
//     id: "3",
//     title: "UI/UX Design Principles for Better User Experience",
//     description:
//       "Master the art of creating intuitive and beautiful user interfaces. This article breaks down essential design principles, color theory, typography, and user psychology to help you create products that users love.",
//     authorId: "user_789",
//     images: [
//       "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
//       "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800",
//       "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800",
//     ],
//     createdAt: "2025-01-03T09:15:00Z",
//     updatedAt: "2025-01-03T09:15:00Z",
//   },
// ];

export default function BlogListingPage() {
  // const [blogs] = useState<Blog[]>(PLACEHOLDER_BLOGS);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-black mb-3">Our Blogs</h1>
            <p className="text-gray-600 text-lg">
              Insights and stories from DreamWise Group
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/blogs/create">Create blog</Link>
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense fallback={<Spinner />}>
            <Blogs />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
