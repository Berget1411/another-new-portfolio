"use client";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { ProjectCard } from "./project-card";
import { motion } from "framer-motion";
import { projects } from "@/assets/projects";
import { GlowingEffect } from "../ui/glowing-effect";

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
  const [showAll, setShowAll] = useState(false);
  const maxItems = 5; // Show 6 projects initially (2 rows of 3)

  // Animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1],
      },
    }),
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

  // Determine projects to display
  const projectsToDisplay = showAll
    ? formattedProjects
    : formattedProjects.slice(0, maxItems);
  const hasMoreProjects = formattedProjects.length > maxItems;

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

      <div className='main-container pt-8 md:pt-12'>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr'>
            {projectsToDisplay.map((project, index) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: "-50px" }}
                custom={index}
                className='flex'
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}

            {/* Show More Button Card */}
            {hasMoreProjects && !showAll && (
              <motion.div
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: "-50px" }}
                custom={projectsToDisplay.length}
                className='flex'
              >
                <button
                  onClick={() => setShowAll(true)}
                  className='relative w-full rounded-xl border border-background-tertiary p-1.5 md:rounded-2xl md:p-2 hover:border-primary transition-colors group flex-1'
                >
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className='relative flex h-full flex-col justify-center items-center overflow-hidden rounded-lg p-3 md:p-4 bg-background-secondary/30 backdrop-blur-sm group-hover:bg-background-secondary/50 transition-colors min-h-[20rem]'>
                    <div className='text-center'>
                      <div className='text-3xl md:text-4xl mb-3 text-primary'>
                        +
                      </div>
                      <h3 className='text-lg md:text-xl font-semibold text-white mb-2'>
                        Show More Projects
                      </h3>
                      <p className='text-sm md:text-base text-white/80'>
                        {formattedProjects.length - maxItems} more projects
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            )}
          </div>

          {/* Show Less Button */}
          {showAll && hasMoreProjects && (
            <motion.div
              className='flex justify-center mt-6'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowAll(false)}
                className='px-6 py-3 rounded-lg border border-background-tertiary bg-background-secondary/30 text-white hover:bg-background-secondary/50 hover:border-primary transition-colors font-medium'
              >
                Show Less
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
