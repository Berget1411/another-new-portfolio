"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function About() {
  const [tab, setTab] = useState("about");

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
        duration: 0.6,
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

  // Add tab content animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  // Centralized data object for all content
  const contentData = [
    {
      id: "about",
      label: "About me",
      main: "Hi, I'm Ludvig—a self-taught programmer and first-year M.Sc. student in Industrial Engineering and Management at KTH. Alongside my studies, I'm a software developer at THS Business, helping KTH students connect with future employers. I'm currently expanding my skills in full-stack development and leveraging AI tools like Cursor and ChatGPT to code more efficiently.",
      cards: [
        "Full stack developer",
        "Specializing in frontend",
        "Started when I was 12",
        "20 years old",
      ],
    },
    {
      id: "started",
      label: "How it started",
      main: "My journey in programming began when I was 12 years old. What started as simple curiosity quickly evolved into a passion for building websites and applications. During high school, I deepened my knowledge by taking on more complex projects and exploring frameworks like React and Next.js.",
      cards: [
        "Full stack developer",
        "Specializing in frontend",
        "Started when I was 12",
        "20 years old",
      ],
    },
    {
      id: "mindset",
      label: "My mindset",
      main: "I approach problems with a blend of analytical thinking and creative problem-solving. My philosophy is that good code should be both efficient and readable. I believe in continuous learning and staying adaptable in the ever-evolving tech landscape.",
      values: [
        "Clean, maintainable code",
        "User-centered design",
        "Continuous improvement",
        "Pragmatic problem solving",
      ],
    },
  ];

  return (
    <section
      id='about'
      className='relative w-full min-h-screen bg-background py-12 md:py-20'
    >
      <div className='container mx-auto px-4 md:px-8'>
        <motion.div
          className='max-w-4xl mx-auto'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className='text-2xl md:text-5xl font-bold mb-6 md:mb-8 text-center md:text-left'
            variants={itemVariants}
          >
            About me
          </motion.h2>

          {/* Tab Navigation */}
          <motion.div
            className='flex flex-wrap overflow-x-auto border-b border-gray-700 mb-6 justify-center md:justify-start'
            variants={itemVariants}
          >
            {contentData.map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => setTab(tabItem.id)}
                className={`px-3 md:px-4 py-2 text-sm md:text-lg whitespace-nowrap ${
                  tab === tabItem.id
                    ? "text-primary border border-primary border-b-0 rounded-t-md font-medium"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tabItem.label}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div className='space-y-6' variants={itemVariants}>
            {/* About tab content */}
            {contentData
              .filter((item) => item.id === tab)
              .map((item) => (
                <motion.div
                  key={item.id}
                  variants={tabContentVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  transition={{ duration: 0.4 }}
                >
                  <motion.p className='text-base md:text-lg leading-relaxed text-center md:text-left'>
                    {item.main}
                  </motion.p>

                  <motion.div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8'>
                    {item.cards &&
                      item.cards.map((card, index) => (
                        <motion.div
                          key={`about-card-${index}`}
                          className='bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center md:text-left text-sm md:text-base shadow-lg hover:border-primary/40 transition-colors group relative overflow-hidden'
                          variants={cardVariants}
                          custom={index}
                          initial='hidden'
                          animate='visible'
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                          <div className='relative z-10'>{card}</div>
                        </motion.div>
                      ))}

                    {item.values &&
                      item.values.map((value, index) => (
                        <motion.div
                          key={`about-value-${index}`}
                          className='bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center md:text-left text-sm md:text-base shadow-lg hover:border-primary/40 transition-colors group relative overflow-hidden'
                          variants={cardVariants}
                          custom={index}
                          initial='hidden'
                          animate='visible'
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                          <div className='relative z-10'>{value}</div>
                        </motion.div>
                      ))}
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
