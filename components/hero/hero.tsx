"use client";

import Link from "next/link";
import { HeroBackground } from "./hero-background";
import { TypeWriter } from "../ui/type-writer";
import { HeroMedia } from "./hero-media";
import { ReadMore } from "./read-more";
import { HeroNavigation } from "./hero-navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Hero() {
  const [alignment, setAlignment] = useState<"left" | "center">("left");

  // Use useEffect for client-side window access
  useEffect(() => {
    setAlignment(window.innerWidth < 768 ? "center" : "left");

    const handleResize = () => {
      setAlignment(window.innerWidth < 768 ? "center" : "left");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          className='flex md:justify-between w-full md:ml-24 max-md:flex-col max-md:p-6 max-md:pt-10 max-md:text-center'
          initial='hidden'
          animate='visible'
          variants={containerVariants}
        >
          <motion.div
            className='flex flex-col justify-center max-md:items-center max-md:justify-start'
            variants={containerVariants}
          >
            <motion.h1
              className='relative z-10 text-2xl md:text-5xl font-bold mb-2'
              variants={itemVariants}
            >
              <TypeWriter text="Hi, I'm Ludvig." speed={75} align={alignment} />
            </motion.h1>

            <motion.p
              className='text-text-secondary text-sm md:text-xl mt-2 mb-2 max-w-md mx-auto md:mx-0'
              variants={itemVariants}
            >
              Full Stack Developer, AI, Finance & Management
            </motion.p>

            <motion.ul
              className='space-y-1.5 md:space-y-3 max-md:mt-2 max-md:mb-3 w-full flex flex-col items-center md:items-start'
              variants={containerVariants}
            >
              <motion.li
                className='flex flex-col md:flex-row md:items-center items-center'
                variants={itemVariants}
              >
                <span className='mb-1 md:mb-0'>
                  M.Sc. Industrial Engineering and Management
                </span>
                <Link
                  href='https://kth.se'
                  className='text-primary hover:text-primary/80 transition-colors inline-flex items-center text-base font-semibold'
                >
                  <span className='border-b-2 border-primary/30 pb-0.5 md:ml-2'>
                    @KTH
                  </span>
                </Link>
              </motion.li>

              <motion.li
                className='flex flex-col md:flex-row md:items-center items-center mt-3 md:mt-0'
                variants={itemVariants}
              >
                <span className='mb-1 md:mb-0'>Software Developer</span>
                <Link
                  href='https://kthais.com'
                  className='text-primary hover:text-primary/80 transition-colors inline-flex items-center text-base font-semibold'
                >
                  <span className='border-b-2 border-primary/30 pb-0.5 md:ml-2'>
                    @KTHAIS
                  </span>
                </Link>
              </motion.li>
            </motion.ul>

            <motion.div
              variants={itemVariants}
              className='w-full flex justify-center md:justify-start'
            >
              <HeroMedia />
            </motion.div>
          </motion.div>

          <motion.div
            className='flex flex-col justify-center z-30 max-md:mt-4'
            variants={rightSideVariants}
            initial='hidden'
            animate='visible'
          >
            <HeroNavigation />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className='absolute bottom-4 left-0 right-0 flex justify-center max-sm:bottom-2'
        variants={readMoreVariants}
        initial='hidden'
        animate='visible'
      >
        <ReadMore />
      </motion.div>
    </section>
  );
}
