import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | WorkMarket",
    default: "WorkMarket — Find Talent. Build Something Remarkable.",
  },
  description: "A modern freelance marketplace connecting businesses with skilled freelancers for web development, design, mobile apps, marketing, and more.",
  keywords: ["freelance", "marketplace", "hire developers", "designers", "remote work", "jobs", "contractors", "WorkMarket"],
  authors: [{ name: "WorkMarket Inc." }],
  creator: "WorkMarket",
  openGraph: {
    title: "WorkMarket — Find Talent. Build Something Remarkable.",
    description: "A modern freelance marketplace connecting businesses with skilled freelancers for web development, design, mobile apps, marketing, and more.",
    url: "https://workmarket.demo",
    siteName: "WorkMarket",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkMarket — Find Talent. Build Something Remarkable.",
    description: "A modern freelance marketplace connecting businesses with skilled freelancers.",
    creator: "@workmarket",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text-primary)]">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
