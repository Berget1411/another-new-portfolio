"use client";
import { type Project } from "./projects";
import { Badge } from "../ui/badge";
import { Icon } from "../ui/icon";
import { Github, Link } from "lucide-react";
import { scrollToSection } from "@/utils/scroll-to-section";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className='group rounded-lg p-6 transition-all duration-300 shadow-md border border-background-tertiary hover:border-background-tertiary/80 hover:shadow-lg cursor-pointer '
      onClick={() => scrollToSection(project.title)}
    >
      <div className='flex justify-between items-start mb-3'>
        <h3 className='text-xl font-bold text-text-primary group-hover:text-primary/90 transition-colors'>
          {project.title}
        </h3>
        <div className='flex gap-3 mt-1'>
          {project.github && (
            <a
              href={project.github}
              target='_blank'
              rel='noopener noreferrer'
              className='text-text-secondary hover:text-primary transition-colors'
            >
              <Icon icon={<Github className='w-5 h-5' />} tooltip='GitHub' />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-text-secondary hover:text-primary transition-colors'
            >
              <Icon icon={<Link className='w-5 h-5' />} tooltip='Live Demo' />
            </a>
          )}
        </div>
      </div>
      <p className='text-sm text-text-secondary mb-5 leading-relaxed'>
        {project.description}
      </p>
      <div className='flex flex-wrap justify-between items-center'>
        <div className='flex flex-wrap gap-2 mb-1'>
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              size='md'
              className='bg-background-tertiary/50 text-text-secondary hover:bg-background-tertiary'
            >
              {tech}
            </Badge>
          ))}
        </div>
        <span className='text-xs text-text-tertiary italic mt-2'>
          {project.date}
        </span>
      </div>
    </div>
  );
}
