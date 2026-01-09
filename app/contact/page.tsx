import ContactPage from "@/modules/contact/contact-page";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact German Tutor | Tutordai",
  description:
    "Contact a C1 certified German tutor at Tutordai. Ask about German classes, exam preparation, or studying in Germany.",
  keywords: [
    "Contact German Tutor",
    "German Classes Nepal Contact",
    "Tutordai Contact",
    "German Tutor Inquiry",
    "Learn German Nepal",
  ],
  alternates: {
    canonical: "https://tutordai.com/contact",
  },
  openGraph: {
    title: "Contact German Tutor | Tutordai",
    description:
      "Get in touch with a C1 certified German tutor. Submit your inquiry for German language classes and exam preparation.",
    url: "https://tutordai.com/contact",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Tutordai",
            description:
              "Contact page for Tutordai German language classes and exam preparation.",
            url: "https://tutordai.com/contact",
            mainEntity: {
              "@type": "EducationalOrganization",
              name: "Tutordai",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                availableLanguage: ["English", "German"],
              },
            },
          }),
        }}
      />
      <ContactPage />
    </>
  );
}
