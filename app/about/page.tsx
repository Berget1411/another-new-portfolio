import { Metadata } from "next";
import { About } from "@/components/about/about";

export const metadata: Metadata = {
  title: "About Ludvig Bergström | Full-Stack Developer",
  description:
    "Learn about Ludvig Bergström's experience in software development, AI, finance, and management. KTH student and IT consultant.",
  // Additional metadata specific to this page
};

export default function AboutPage() {
  return <About />;
}
