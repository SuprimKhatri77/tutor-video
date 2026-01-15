import { EventsPage } from "@/modules/upcoming-events/upcoming-events";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Events & Announcements | TutorDai",
  description:
    "Stay updated with the latest events, workshops, and announcements on TutorDai. Discover what's happening and never miss important updates.",
  icons: {
    icon: [
      {
        url: "https://tutordai.com/logoBgWhite.jpg",
        href: "https://tutordai.com/logoBgWhite.jpg",
      },
    ],
  },
  openGraph: {
    title: "Upcoming Events & Announcements | TutorDai",
    description:
      "Check out the latest events, workshops, and updates on TutorDai. Stay informed and be part of our community activities.",
    url: "https://tutordai.com/events",
    siteName: "TutorDai",
    images: [
      {
        url: "https://tutordai.com/events-default-preview.png",
        width: 1200,
        height: 630,
        alt: "TutorDai Events",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming Events & Announcements | TutorDai",
    description:
      "Explore the latest events, workshops, and announcements on TutorDai. Stay updated with everything happening in our community.",
    images: ["https://tutordai.com/events-default-preview.png"],
  },
};

export default async function page() {
  return <EventsPage />;
}
