"use client";
import { Separator } from "../ui/separator";
import { ProjectCard } from "./project-card";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project1",
    link: "https://project1.com",
  },
  {
    title: "Project 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project2",
    link: "https://project2.com",
  },
  {
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project3",
    link: "https://project3.com",
  },
  {
    title: "Project 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project4",
    link: "https://project4.com",
  },
  {
    title: "Project 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project5",
    link: "https://project5.com",
  },
  {
    title: "Project 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project6",
    link: "https://project6.com",
  },
];

export type Project = (typeof projects)[number];

export function Projects() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <div className='py-12 md:py-20'>
      <Separator>
        <h2 className='text-2xl md:text-5xl font-bold mb-0 text-center'>
          Projects
        </h2>
      </Separator>
      <motion.div
        className='main-container pt-8 md:pt-12'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              custom={index}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
