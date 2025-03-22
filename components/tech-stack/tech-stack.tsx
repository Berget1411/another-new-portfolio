"use client";
import { TechGridItem } from "./tech-grid-item";
import { techStack } from "@/assets/tech-stack";
import { CgWebsite, CgServer } from "react-icons/cg";
import { IoCodeSlash } from "react-icons/io5";
import { motion } from "framer-motion";

export function TechStack() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className='py-6 px-3 md:py-10 md:px-6' id='tech-stack'>
      <motion.div
        className='max-w-6xl mx-auto'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          className='text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center'
          variants={itemVariants}
        >
          My Tech Stack
        </motion.h2>
        <motion.p
          className='text-text-secondary text-center max-w-2xl mx-auto mb-5 md:mb-8 text-sm md:text-base'
          variants={itemVariants}
        >
          Technologies and tools I use to bring ideas to life
        </motion.p>

        <motion.ul
          className='grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-2 lg:gap-4'
          variants={containerVariants}
        >
          {/* Frontend */}
          <motion.li
            className='list-none h-full md:[grid-area:1/1/2/7] lg:[grid-area:1/1/2/7]'
            variants={itemVariants}
          >
            <div className='h-full'>
              <TechGridItem
                area=''
                title='Frontend'
                technologies={techStack.frontend}
                icon={<CgWebsite className='h-4 w-4 md:h-5 md:w-5' />}
              />
            </div>
          </motion.li>

          {/* Backend */}
          <motion.li
            className='list-none h-full md:[grid-area:1/7/2/13] lg:[grid-area:1/7/2/13]'
            variants={itemVariants}
          >
            <div className='h-full'>
              <TechGridItem
                area=''
                title='Backend'
                technologies={techStack.backend}
                icon={<CgServer className='h-4 w-4 md:h-5 md:w-5' />}
              />
            </div>
          </motion.li>

          {/* Other - full width with left-aligned content */}
          <motion.li
            className='list-none h-full md:[grid-area:2/1/3/13] lg:[grid-area:2/1/3/13]'
            variants={itemVariants}
          >
            <div className='h-full'>
              <TechGridItem
                area=''
                title='Other Tools'
                technologies={techStack.other}
                icon={<IoCodeSlash className='h-4 w-4 md:h-5 md:w-5' />}
                leftAligned={true}
              />
            </div>
          </motion.li>
        </motion.ul>
      </motion.div>
    </section>
  );
}
