"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experience, education } from "@/assets";
import { GlowingEffect } from "../ui/glowing-effect";
import Image from "next/image";
import { awards } from "@/assets/awards";

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
      id: "experience",
      label: "Experience",
      main: "My journey in programming began when I was 12 years old. What started as simple curiosity quickly evolved into a passion for building websites and applications. During high school, I deepened my knowledge by taking on more complex projects and exploring frameworks like React and Next.js.",
      items: experience,
    },
    {
      id: "education",
      label: "Education",
      main: "I approach problems with a blend of analytical thinking and creative problem-solving. My philosophy is that good code should be both efficient and readable. I believe in continuous learning and staying adaptable in the ever-evolving tech landscape.",
      items: education,
    },
    {
      id: "awards",
      label: "Awards",
      main: "I approach problems with a blend of analytical thinking and creative problem-solving. My philosophy is that good code should be both efficient and readable. I believe in continuous learning and staying adaptable in the ever-evolving tech landscape.",
      items: awards,
    },
  ];

  return (
    <section
      id='about'
      className='relative w-full bg-background py-12 md:py-20 '
    >
      <div className='main-container '>
        <motion.div
          className=''
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
            {/* Content for selected tab */}
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
                  <motion.p className='text-base md:text-lg leading-relaxed text-center md:text-left mb-6'>
                    {item.main}
                  </motion.p>

                  {/* Render different content based on tab type */}
                  {item.id === "about" && item.cards && (
                    <motion.ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8'>
                      {item.cards.map((card, index) => (
                        <motion.li
                          key={`about-card-${index}`}
                          custom={index}
                          variants={cardVariants}
                          initial='hidden'
                          animate='visible'
                          className='list-none'
                        >
                          <div className='relative rounded-xl border border-background-tertiary p-1.5 md:rounded-2xl md:p-2'>
                            <GlowingEffect
                              spread={40}
                              glow={true}
                              disabled={false}
                              proximity={64}
                              inactiveZone={0.01}
                            />
                            <div className='relative flex flex-col justify-center items-center overflow-hidden rounded-lg p-3 md:p-4 bg-background-secondary/30 backdrop-blur-sm'>
                              <div className='relative z-10 text-center'>
                                <span className='text-base  text-text-primary font-medium'>
                                  {card}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}

                  {/* Grid for experience and education */}
                  {(item.id === "experience" ||
                    item.id === "education" ||
                    item.id === "awards") &&
                    item.items && (
                      <motion.ul className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                        {item.items.map((entry, index) => (
                          <ExperienceCard
                            key={entry.id}
                            entry={entry}
                            index={index}
                            variants={cardVariants}
                          />
                        ))}
                      </motion.ul>
                    )}
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Experience/Education Card Component
interface EntryItem {
  id: string;
  title: string;
  undertitle: string;
  date: string;
  desc1: string;
  desc2: string;
  image: string;
}

interface ExperienceCardProps {
  entry: EntryItem;
  index: number;
  variants: {
    hidden: { opacity: number; scale: number };
    visible: (i: number) => {
      opacity: number;
      scale: number;
      transition: {
        delay: number;
        duration: number;
        ease: number[];
      };
    };
  };
}

function ExperienceCard({ entry, index, variants }: ExperienceCardProps) {
  return (
    <motion.li
      custom={index}
      variants={variants}
      initial='hidden'
      animate='visible'
      className='min-h-[12rem] md:min-h-[16rem] list-none'
    >
      <div className='relative h-full rounded-xl border border-background-tertiary p-1.5 md:rounded-2xl md:p-2'>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className='relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-3 md:p-4 bg-background-secondary/30 backdrop-blur-sm'>
          {/* Header with icon/image and title */}
          <div className='flex items-center gap-2 md:gap-3 mb-2 md:mb-3'>
            <div className='flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-md border border-background-tertiary bg-background-secondary/50 overflow-hidden'>
              <Image
                src={entry.image}
                alt={entry.title}
                width={48}
                height={48}
                className='w-full h-full object-cover rounded-md'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className='text-base md:text-lg font-semibold text-text-primary truncate'>
                {entry.title}
              </h3>
              <p className='text-xs md:text-sm text-text-secondary truncate'>
                {entry.undertitle}
              </p>
            </div>
            <div className='ml-auto px-2 py-1 text-xs font-medium rounded-full bg-background-tertiary/50 text-text-secondary whitespace-nowrap'>
              {entry.date}
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 mt-2 space-y-2 text-sm'>
            <p className='text-text-primary'>{entry.desc1}</p>
            <p className='text-text-primary'>{entry.desc2}</p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
