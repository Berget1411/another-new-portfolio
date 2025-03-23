import React from "react";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ludvig Bergström",
    url: "https://ludvigbergstrom.com",
    sameAs: [
      "https://linkedin.com/in/ludvigbergstrom",
      "https://github.com/ludvigbergstrom",
      // Update with your actual social media profiles
    ],
    jobTitle: "Full-Stack IT Consultant",
    worksFor: [
      {
        "@type": "Organization",
        name: "We Know IT",
        roleName: "Full-Stack Developer",
      },
      {
        "@type": "Organization",
        name: "KTH AI Society",
        roleName: "Full-Stack Developer",
      },
      {
        "@type": "Organization",
        name: "THS Business",
        roleName: "Frontend Lead & Full-Stack Developer",
      },
    ],
    description:
      "Full-Stack IT Consultant and Industrial Engineering and Management student with hands-on experience in software development, hackathons, and consulting. Passionate about computer science, artificial intelligence, finance, and management.",
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "KTH Royal Institute of Technology",
        department: "Industrial Engineering and Management",
      },
      {
        "@type": "EducationalOrganization",
        name: "Nacka Gymnasium",
      },
    ],
    knowsAbout: [
      "Full stack development",
      "Artificial Intelligence",
      "Finance",
      "Management",
      "React",
      "Next.js",
      "TypeScript",
    ],
    award: "Lovable Hackathon Winner - Swedish AI Startup Competition",
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
