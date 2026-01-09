import YoutubeGallery from "@/modules/videos/yt-videos";

import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "German Learning Videos by C1 Certified Tutor",
  description:
    "Watch free German learning videos by a C1 certified German tutor. Grammar lessons, exam preparation, and spoken German for Nepali students.",
  keywords: [
    "German learning videos",
    "German tutor YouTube",
    "Learn German online Nepal",
    "Free German classes",
    "German exam preparation videos",
    "Tutordai German videos",
  ],
  alternates: {
    canonical: "https://tutordai.com/videos",
  },
  openGraph: {
    title: "German Learning Videos | Tutordai",
    description:
      "Free German learning videos by a C1 certified tutor. Grammar, exams, and spoken German explained clearly for Nepali students.",
    url: "https://tutordai.com/videos",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Script
        id="videos-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "German Learning Videos",
            description:
              "A collection of free German learning videos by a C1 certified German tutor. Covers grammar, exam preparation, and spoken German.",
            publisher: {
              "@type": "Organization",
              name: "Tutordai",
              url: "https://tutordai.com",
            },
          }),
        }}
      />

      <YoutubeGallery />
    </>
  );
}
