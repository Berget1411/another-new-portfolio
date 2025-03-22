"use client";
import { Separator } from "../ui/separator";
import { ProjectCard } from "./project-card";
import { motion } from "framer-motion";
import { projects } from "@/assets/projects";

// Create a type based on the imported projects
export type Project = {
  title: string;
  description: string;
  date: string;
  techStack: string[];
  github?: string;
  link?: string;
};

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

  // Map imported projects to the format expected by ProjectCard
  const formattedProjects = projects.map((project) => ({
    title: project.title,
    description: project.shortDescription,
    date: project.date,
    techStack: project.tech,
    github: project.github || "",
    link: project.demo || "",
  }));

  return (
    <div className='py-12 md:py-20' id='projects'>
      <Separator>
        <motion.h2
          className='text-2xl md:text-5xl font-bold mb-0 text-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          Projects
        </motion.h2>
      </Separator>

      <motion.p
        className='text-center text-lg font-medium text-text-secondary'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
        variants={itemVariants}
      >
        Here are some of my previous projects and ones I&apos;m working on right
        now
      </motion.p>
      <motion.div
        className='main-container pt-8 md:pt-12'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {formattedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              custom={index}
              className='h-full'
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
