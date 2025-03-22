"use client";
import { type Project } from "./projects";
import { Badge } from "../ui/badge";
import { Icon } from "../ui/icon";
import { Github, Link } from "lucide-react";
import { scrollToSection } from "@/utils/scroll-to-section";
import { GlowingEffect } from "../ui/glowing-effect";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className='relative list-none'>
      <div className='relative rounded-xl border border-background-tertiary p-1.5 md:rounded-2xl md:p-2 group'>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div
          className='relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-3 md:p-4 bg-background-secondary/30 backdrop-blur-sm cursor-pointer'
          onClick={() => scrollToSection(project.title)}
        >
          <div>
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon
                      icon={<Github strokeWidth={2} />}
                      tooltip='GitHub'
                      size='md'
                    />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-text-secondary hover:text-primary transition-colors'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon
                      icon={<Link strokeWidth={2} />}
                      tooltip='Live Demo'
                      size='md'
                    />
                  </a>
                )}
              </div>
            </div>
            <p className='text-sm text-text-secondary mb-5 leading-relaxed'>
              {project.description}
            </p>
          </div>

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
      </div>
    </div>
  );
}
