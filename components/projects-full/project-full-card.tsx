"use client";
import { Project } from "./projects-full";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icon } from "../ui/icon";
import { Github, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { IFrameDialog } from "./i-frame-dialog";
import { RevealElement } from "../ui/reveal-element";

export function ProjectFullCard({
  project,
  reverse,
  index,
}: {
  project: Project;
  reverse?: boolean;
  index: number;
}) {
  // Format the index to have leading zero for single digits
  const formattedIndex = String(index + 1).padStart(2, "0");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // Function to conditionally open the dialog only if URL exists
  const handlePreviewClick = () => {
    if (project.link) {
      setIsDialogOpen(true);
    }
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      id={project.title}
      ref={cardRef}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(
        "flex justify-between items-center gap-10 py-16 relative",
        // Only apply reverse on screens larger than md
        reverse ? "md:flex-row-reverse max-md:flex-col" : "max-md:flex-col"
      )}
    >
      {/* Background Number - Updated positioning and styling */}
      <motion.div
        className={cn(
          "absolute -z-10 text-[120px] font-bold text-transparent select-none -top-10 max-md:-top-8 lg:top-0",
          // Position left for all mobile layouts, respect reverse only on md+
          "max-md:-right-0 md:-left-10",
          reverse && "md:right-0 md:left-auto",
          "number-outline"
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {formattedIndex}
      </motion.div>

      <motion.div
        className='flex flex-col gap-5 max-w-lg'
        variants={containerVariants}
      >
        {/* Project title with reveal animation */}
        <RevealElement isVisible={isInView} direction='left' color='secondary'>
          <h2 className='text-4xl font-bold'>{project.title}</h2>
        </RevealElement>

        {/* Description with fade-in animation */}
        <motion.p
          className='text-sm text-text-secondary leading-relaxed'
          variants={itemVariants}
        >
          {project.description}
        </motion.p>

        {/* Buttons with fade-in animation */}
        <motion.div
          className='flex gap-4 items-center mt-3'
          variants={itemVariants}
        >
          {project.link ? (
            <Button className='group'>
              <Link href={project.link}>View Project</Link>
              <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
            </Button>
          ) : (
            <Button className='group' disabled>
              <span>Not Available</span>
              <ExternalLink className='w-4 h-4 ml-2 opacity-50' />
            </Button>
          )}

          {project.github && (
            <Link
              href={project.github}
              className='text-text-secondary hover:text-primary transition-colors'
            >
              <Icon
                icon={<Github strokeWidth={2} />}
                size='md'
                tooltip='View on Github'
              />
            </Link>
          )}
        </motion.div>
      </motion.div>

      {/* Project image with reveal animation - now using the same direction and color as the title */}
      <RevealElement
        isVisible={isInView}
        direction='left'
        color='secondary'
        className='w-full max-w-lg'
      >
        <div
          className={cn(
            "overflow-hidden shadow-md relative group",
            project.link ? "cursor-pointer" : "cursor-default"
          )}
          onClick={handlePreviewClick}
        >
          {project.link && (
            <motion.div
              className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10'
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <Button variant='outline' className='bg-background-primary/80'>
                Preview Website
              </Button>
            </motion.div>
          )}
          <motion.div
            whileHover={project.link ? { scale: 1.02 } : {}}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={project.image || "/images/placeholder_image.png"}
              alt={project.title}
              width={500}
              height={300}
              className={cn("w-full h-auto object-cover", "clip-corners")}
              style={{
                clipPath: !reverse
                  ? "polygon(0% 15px, 15px 0%, 100% 0%, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0% 100%)"
                  : "polygon(0% 15px, 15px 0%, 100% 0%, 100% 100%, 60px 100%, 0% calc(100% - 60px))",
              }}
            />
          </motion.div>
        </div>
      </RevealElement>

      {/* IFrame Dialog - only render if project.link exists */}
      {project.link && (
        <IFrameDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={project.title}
          url={project.link}
        />
      )}
    </motion.div>
  );
}
