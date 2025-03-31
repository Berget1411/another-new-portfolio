import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { Provider } from "./provider/provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ludvig Bergström | Full-Stack IT Consultant & Developer",
  description:
    "Portfolio of Ludvig Bergström - Full-Stack IT Consultant and Industrial Engineering and Management student at KTH with expertise in React, Next.js, AI, finance, and management.",
  keywords: [
    "full-stack developer",
    "IT consultant",
    "We Know IT",
    "KTH AI Society",
    "THS Business",
    "artificial intelligence",
    "React",
    "Next.js",
    "TypeScript",
    "finance",
    "management",
    "Industrial Engineering",
    "hackathon winner",
  ],
  authors: [{ name: "Ludvig Bergström" }],
  creator: "Ludvig Bergström",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ludvigbergstrom.com",
    title: "Ludvig Bergström | Full-Stack IT Consultant & Developer",
    description:
      "Full-Stack IT Consultant and Industrial Engineering and Management student with hands-on experience in software development, hackathons, and consulting. Passionate about computer science, artificial intelligence, finance, and management.",
    siteName: "Ludvig Bergström Portfolio",
    images: [
      {
        url: "https://ludvigbergstrom.com/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Ludvig Bergström - Full-Stack IT Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ludvig Bergström | Full-Stack IT Consultant & Developer",
    description:
      "Full-Stack IT Consultant and Industrial Engineering and Management student with hands-on experience in software development, hackathons, and consulting. Passionate about computer science, artificial intelligence, finance, and management.",
    images: ["https://ludvigbergstrom.com/images/profile.png"],
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
    <html lang='en'>
      <head>
        <StructuredData />
        <link rel='canonical' href='https://ludvigbergstrom.com' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
