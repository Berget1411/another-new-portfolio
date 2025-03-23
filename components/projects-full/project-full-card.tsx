"use client";
import { Project } from "./projects-full";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icon } from "../ui/icon";
import { Github, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { IFrameDialog } from "./i-frame-dialog";

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

  // Function to conditionally open the dialog only if URL exists
  const handlePreviewClick = () => {
    if (project.link) {
      setIsDialogOpen(true);
    }
  };

  return (
    <motion.div
      id={project.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "flex justify-between items-center gap-10 py-16 relative",
        // Only apply reverse on screens larger than md
        reverse ? "md:flex-row-reverse max-md:flex-col" : "max-md:flex-col"
      )}
    >
      {/* Background Number - Updated positioning and styling */}
      <div
        className={cn(
          "absolute -z-10 text-[120px] font-bold text-transparent select-none -top-10 max-md:-top-8 lg:top-0",
          // Position left for all mobile layouts, respect reverse only on md+
          "max-md:-right-0 md:-left-10",
          reverse && "md:right-0 md:left-auto",
          "number-outline"
        )}
      >
        {formattedIndex}
      </div>

      <div className='flex flex-col gap-5 max-w-lg'>
        <h2 className='text-4xl font-bold'>{project.title}</h2>
        <p className='text-sm text-text-secondary leading-relaxed'>
          {project.description}
        </p>
        <div className='flex gap-4 items-center mt-3'>
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
        </div>
      </div>

      <motion.div
        className={cn(
          "w-full max-w-lg overflow-hidden shadow-md relative group",
          project.link ? "cursor-pointer" : "cursor-default"
        )}
        whileHover={project.link ? { scale: 1.02 } : {}}
        transition={{ duration: 0.3 }}
        onClick={handlePreviewClick}
      >
        {project.link && (
          <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10'>
            <Button variant='outline' className='bg-background-primary/80'>
              Preview Website
            </Button>
          </div>
        )}
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
