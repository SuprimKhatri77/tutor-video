import { BlogList } from "@/modules/blogs/blogs-lists";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Blogs & News | TutorDai",
  description:
    "Read the latest blogs, news, and updates on TutorDai. Stay informed with useful tips, insights, and articles covering a variety of topics.",
  icons: {
    icon: [
      {
        url: "https://tutordai.com/logoBgWhite.jpg",
        href: "https://tutordai.com/logoBgWhite.jpg",
      },
    ],
  },
  openGraph: {
    title: "Latest Blogs & News | TutorDai",
    description:
      "Explore our collection of blogs and articles on TutorDai. Get the latest updates, news, and helpful insights across a range of topics.",
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
    title: "Latest Blogs & News | TutorDai",
    description:
      "Stay updated with the latest blogs and news on TutorDai. Read articles, tips, and insights across various topics.",
    images: ["https://tutordai.com/blogs-default-preview.png"],
  },
};

export default function Page() {
  return <BlogList />;
}
