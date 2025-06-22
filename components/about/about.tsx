"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experience, education } from "@/assets";
import { GlowingEffect } from "../ui/glowing-effect";
import Image from "next/image";
import { awards } from "@/assets/awards";

export function About() {
  const [tab, setTab] = useState("about");
  const [showAllStates, setShowAllStates] = useState<Record<string, boolean>>(
    {}
  );

  const toggleShowAll = (tabId: string) => {
    setShowAllStates((prev) => ({
      ...prev,
      [tabId]: !prev[tabId],
    }));
  };

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
      main: "Full-Stack IT Consultant and Industrial Engineering and Management student with hands-on experience in software development, hackathons, and consulting. Passionate about computer science, artificial intelligence, finance, and management. Driven by curiosity, I enjoy tackling complex problems, delivering innovative solutions, and collaborating closely with others in dynamic, fast-paced environments.",
      cards: ["Full stack developer", "AI", "Finance", "Management"],
    },
    {
      id: "experience",
      label: "Experience",

      items: experience,
    },
    {
      id: "education",
      label: "Education",

      items: education,
    },
    {
      id: "awards",
      label: "Awards",

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
              .map((item) => {
                const showAll = showAllStates[item.id] || false;
                const maxItems = 3;

                // Determine items to display based on tab type
                let itemsToDisplay: EntryItem[] = [];
                let hasMoreItems = false;

                if (item.items) {
                  itemsToDisplay = showAll
                    ? item.items
                    : item.items.slice(0, maxItems);
                  hasMoreItems = item.items.length > maxItems;
                }

                return (
                  <motion.div
                    key={item.id}
                    variants={tabContentVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    transition={{ duration: 0.4 }}
                  >
                    <motion.p className='text-base md:text-lg leading-relaxed text-center md:text-left mb-6 text-white'>
                      {item.main}
                    </motion.p>

                    {/* Render different content based on tab type */}
                    {item.id === "about" && item.cards && (
                      <div className='flex flex-col md:flex-row md:items-start gap-6 md:gap-10'>
                        {/* Profile image section on mobile (top position) */}
                        <motion.div
                          className='md:hidden w-full flex justify-center mb-4'
                          variants={itemVariants}
                        >
                          <div className='relative rounded-xl border border-background-tertiary p-1.5 w-36 h-36'>
                            <GlowingEffect
                              spread={40}
                              glow={true}
                              disabled={false}
                              proximity={64}
                              inactiveZone={0.01}
                            />
                            <div className='relative flex h-full w-full overflow-hidden rounded-lg bg-background-secondary/30 backdrop-blur-sm'>
                              <Image
                                src='/images/portrait.jpeg'
                                alt='Profile'
                                fill
                                className='object-cover'
                                sizes='9rem'
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Cards section */}
                        <div className='w-full md:w-2/3'>
                          <motion.ul className='grid grid-cols-2 gap-2 md:gap-4'>
                            {item.cards.map((card, index) => (
                              <motion.li
                                key={`about-card-${index}`}
                                custom={index}
                                variants={cardVariants}
                                initial='hidden'
                                animate='visible'
                                className='list-none'
                              >
                                <div className='relative rounded-xl border border-background-tertiary p-1 md:p-1.5 md:rounded-2xl '>
                                  <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                  />
                                  <div className='relative flex flex-col justify-center items-center overflow-hidden rounded-lg p-2 md:p-4 bg-background-secondary/30 backdrop-blur-sm h-16 md:h-20'>
                                    <div className='relative z-10 text-center w-full'>
                                      <span className='text-sm md:text-base text-text-primary font-medium line-clamp-2'>
                                        {card}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>

                        {/* Profile image section on desktop (right position) */}
                        <motion.div
                          className='hidden md:flex w-1/3 justify-end'
                          variants={itemVariants}
                        >
                          <div className='relative rounded-xl border border-background-tertiary p-1.5 md:rounded-2xl md:p-2 w-56 h-56 lg:w-64 lg:h-64'>
                            <GlowingEffect
                              spread={40}
                              glow={true}
                              disabled={false}
                              proximity={64}
                              inactiveZone={0.01}
                            />
                            <div className='relative flex h-full w-full overflow-hidden rounded-lg bg-background-secondary/30 backdrop-blur-sm'>
                              <Image
                                src='/images/profile.png'
                                alt='Profile'
                                fill
                                className='object-cover'
                                sizes='(max-width: 1024px) 14rem, 16rem'
                              />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* Grid for experience, education, and awards */}
                    {(item.id === "experience" ||
                      item.id === "education" ||
                      item.id === "awards") &&
                      item.items && (
                        <div className='space-y-4'>
                          <motion.ul className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                            {itemsToDisplay.map((entry, index) => (
                              <ExperienceCard
                                key={entry.id}
                                entry={entry}
                                index={index}
                                variants={cardVariants}
                              />
                            ))}

                            {/* Show All Button Card */}
                            {hasMoreItems && !showAll && (
                              <motion.li
                                custom={itemsToDisplay.length}
                                variants={cardVariants}
                                initial='hidden'
                                animate='visible'
                                className='min-h-[12rem] md:min-h-[16rem] list-none'
                              >
                                <button
                                  onClick={() => toggleShowAll(item.id)}
                                  className='relative h-full w-full rounded-xl border border-background-tertiary p-1.5 md:rounded-2xl md:p-2 hover:border-primary transition-colors group'
                                >
                                  <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                  />
                                  <div className='relative flex h-full flex-col justify-center items-center overflow-hidden rounded-lg p-3 md:p-4 bg-background-secondary/30 backdrop-blur-sm group-hover:bg-background-secondary/50 transition-colors'>
                                    <div className='text-center'>
                                      <div className='text-2xl md:text-3xl mb-2 text-primary'>
                                        +
                                      </div>
                                      <h3 className='text-base md:text-lg font-semibold text-white mb-1'>
                                        Show All
                                      </h3>
                                      <p className='text-xs md:text-sm text-white/80'>
                                        {item.items.length - maxItems} more{" "}
                                        {item.label.toLowerCase()}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              </motion.li>
                            )}
                          </motion.ul>

                          {/* Show Less Button */}
                          {showAll && hasMoreItems && (
                            <motion.div
                              className='flex justify-center mt-4'
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <button
                                onClick={() => toggleShowAll(item.id)}
                                className='px-4 py-2 rounded-lg border border-background-tertiary bg-background-secondary/30 text-white hover:bg-background-secondary/50 hover:border-primary transition-colors'
                              >
                                Show Less
                              </button>
                            </motion.div>
                          )}
                        </div>
                      )}
                  </motion.div>
                );
              })}
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
  desc2?: string;
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
              <h3 className='text-base md:text-lg font-semibold text-white truncate'>
                {entry.title}
              </h3>
              <p className='text-xs md:text-sm text-white/80 truncate'>
                {entry.undertitle}
              </p>
            </div>
            <div className='ml-auto px-2 py-1 text-xs font-medium rounded-full bg-background-tertiary/50 text-white whitespace-nowrap'>
              {entry.date}
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 mt-2 space-y-2 text-sm'>
            <p className='text-white'>{entry.desc1}</p>
            <p className='text-white'>{entry.desc2}</p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
