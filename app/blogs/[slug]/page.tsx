import { BlogDetail } from "@/modules/blogs/blog-detail/blog-detail";
import { redirect } from "next/navigation";

import type { Metadata } from "next";
import { getBlogById } from "@/dal/blogs/get-blog-by-id";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogById({ slug });

  if (!blog) {
    return {
      title: "Blog Not Found | TutorDai",
      description:
        "The blog you're looking for couldn't be found. Explore other articles and updates on TutorDai.",
      icons: {
        icon: [
          {
            url: "https://tutordai.com/logoBgWhite.jpg",
            href: "https://tutordai.com/logoBgWhite.jpg",
          },
        ],
      },
      openGraph: {
        title: "Blog Not Found | TutorDai",
        description:
          "This blog post is unavailable. Check out other articles and updates on TutorDai.",
        url: "https://tutordai.com/blogs",
        siteName: "TutorDai",
        images: [
          {
            url: "https://tutordai.com/blogs-default-preview.png",
            width: 1200,
            height: 630,
            alt: "TutorDai Blogs",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog Not Found | TutorDai",
        description:
          "This blog post is unavailable. Explore other articles and updates on TutorDai.",
        images: ["https://tutordai.com/blogs-default-preview.png"],
      },
    };
  }

  return {
    title: `${blog.title} | TutorDai`,
    description: blog.description,
    icons: {
      icon: [
        {
          url: "https://tutordai.com/logoBgWhite.jpg",
          href: "https://tutordai.com/logoBgWhite.jpg",
        },
      ],
    },
    openGraph: {
      title: `${blog.title} | TutorDai`,
      description: blog.description,
      url: `https://tutordai.com/blogs/${blog.slug}`,
      siteName: "TutorDai",
      images: [
        {
          url:
            blog.images?.[0] ||
            "https://tutordai.com/blogs-default-preview.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | TutorDai`,
      description: blog.description,
      images: [
        blog.images?.[0] || "https://tutordai.com/blogs-default-preview.png",
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) redirect("/blogs");

  return <BlogDetail slug={slug} />;
}
