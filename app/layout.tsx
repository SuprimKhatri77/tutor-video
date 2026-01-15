import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutMainWrapper from "@/components/wrapper/main-layout-wrapper";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tutordai.com"),
  title: {
    default: "Tutordai | C1 Certified German Tutor in Nepal",
    template: "%s | Tutordai",
  },
  icons: {
    icon: [{ url: "/favicon.ico", href: "/favicon.ico" }],
  },
  description:
    "Tutordai offers C1 certified German language classes in Nepal. Learn German with an experienced tutor specializing in exam preparation, grammar mastery, and study/work in Germany.",
  keywords: [
    "German Tutor Nepal",
    "C1 German Tutor",
    "German Language Classes Nepal",
    "German Exam Preparation",
    "Study in Germany",
    "Learn German in Nepal",
    "Tutordai",
  ],
  authors: [{ name: "Vikas" }],
  creator: "Tutordai",
  publisher: "Tutordai",
  alternates: {
    canonical: "https://tutordai.com",
  },
  openGraph: {
    type: "website",
    url: "https://tutordai.com",
    title: "Tutordai | C1 Certified German Tutor in Nepal",
    description:
      "Learn German with a C1 certified tutor. 7+ years experience teaching Nepali students. Exam-focused training, flexible timings, and small batches.",
    siteName: "Tutordai",
    images: [
      {
        url: "https://www.tutordai.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tutordai German Tutor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tutordai | C1 Certified German Tutor",
    description:
      "C1 certified German tutor helping Nepali students study and work in Germany.",
    images: ["https://www.tutordai.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <LayoutMainWrapper>{children}</LayoutMainWrapper>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
