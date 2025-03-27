"use client";
import { ProjectFullCard } from "./project-full-card";
import { Separator } from "../ui/separator";
import { projects } from "@/assets/projects";
import { motion } from "framer-motion";
import { RevealElement } from "../ui/reveal-element";

// Create a type based on the imported projects
export type Project = {
  title: string;
  description: string;
  date: string;
  github?: string;
  link?: string;
  image: string | null;
  dev: boolean;
};

// Map imported projects to the format expected by ProjectFullCard
const formattedProjects = projects.map((project) => ({
  title: project.title,
  description: project.longDescription,
  date: project.date,
  github: project.github || "", // Default to empty string if undefined
  link: project.demo || "", // Default to empty string if undefined
  image: project.image || null,
  dev: project.devMode,
}));

const firstDevProjectIndex = formattedProjects.findIndex(
  (project) => project.dev
);

export function ProjectsFull() {
  return (
    <section className='main-container py-20'>
      <motion.div
        className='flex flex-col relative'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {formattedProjects.map((project, index) => (
          <div key={project.title}>
            <ProjectFullCard
              project={project}
              reverse={index % 2 !== 0}
              index={index}
            />
            {index === firstDevProjectIndex && firstDevProjectIndex !== -1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Separator position='left'>
                  <RevealElement direction='top' color='primary'>
                    <h2 className='text-2xl md:text-4xl font-bold mb-0 text-center'>
                      Projects in development
                    </h2>
                  </RevealElement>
                </Separator>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
