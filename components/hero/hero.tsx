"use client";

import Link from "next/link";
import { HeroBackground } from "./hero-background";
import { TypeWriter } from "../ui/type-writer";
import { HeroMedia } from "./hero-media";
import { ReadMore } from "./read-more";
import { HeroNavigation } from "./hero-navigation";
import { motion } from "framer-motion";

export function Hero() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const rightSideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const readMoreVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      className='relative w-full h-[100dvh] overflow-hidden'
      id='hero-section'
    >
      <HeroBackground />
      <div className='absolute inset-0 flex h-full w-full'>
        <motion.div
          className='flex md:justify-between w-full md:ml-24 max-md:flex-col max-md:p-24 max-md:text-center'
          initial='hidden'
          animate='visible'
          variants={containerVariants}
        >
          <motion.div
            className='flex flex-col justify-center'
            variants={containerVariants}
          >
            <motion.h1
              className='relative z-10 text-3xl md:text-5xl font-bold mb-2'
              variants={itemVariants}
            >
              <TypeWriter text="Hi, I'm Ludvig." speed={75} align='left' />
            </motion.h1>

            <motion.p
              className='text-text-secondary text-md md:text-xl mt-2 mb-4 w-md max-md:w-full'
              variants={itemVariants}
            >
              Full Stack Developer, AI, Finance & Management
            </motion.p>

            <motion.ul
              className='space-y-3 max-md:mt-4 max-md:w-full max-md:text-sm'
              variants={containerVariants}
            >
              <motion.li
                className='max-md:flex max-md:flex-col max-md:items-center'
                variants={itemVariants}
              >
                <span className='max-md:mb-1'>
                  M.Sc. Industrial Engineering and Management
                </span>
                <Link
                  href='https://kth.se'
                  className='text-primary hover:text-primary/80 transition-colors inline-flex items-center max-md:text-base max-md:font-semibold'
                >
                  <span className='border-b-2 border-primary/30 pb-0.5 md:ml-2'>
                    @KTH
                  </span>
                </Link>
              </motion.li>

              <motion.li
                className='max-md:flex max-md:flex-col max-md:items-center max-md:mt-3'
                variants={itemVariants}
              >
                <span className='max-md:mb-1'>Software Developer</span>
                <Link
                  href='https://kthais.com'
                  className='text-primary hover:text-primary/80 transition-colors inline-flex items-center max-md:text-base max-md:font-semibold'
                >
                  <span className='border-b-2 border-primary/30 pb-0.5 md:ml-2'>
                    @KTHAIS
                  </span>
                </Link>
              </motion.li>
            </motion.ul>

            <motion.div variants={itemVariants}>
              <HeroMedia />
            </motion.div>
          </motion.div>

          <motion.div
            className='flex flex-col justify-center z-30'
            variants={rightSideVariants}
            initial='hidden'
            animate='visible'
          >
            <HeroNavigation />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className='max-md:pb-16'
        variants={readMoreVariants}
        initial='hidden'
        animate='visible'
      >
        <ReadMore />
      </motion.div>
    </section>
  );
}
