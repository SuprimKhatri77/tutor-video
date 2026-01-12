"use client";

import { usePathname } from "next/navigation";
import { Header } from "../Header";
import { Footer } from "../Footer";

export default function LayoutMainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return !isAdminRoute ? (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  ) : (
    <>{children}</>
  );
}
