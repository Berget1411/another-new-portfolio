"use client";
import { type Project } from "./projects";
import { Badge } from "../ui/badge";
import { Icon } from "../ui/icon";
import { Github, Link } from "lucide-react";
import { scrollToSection } from "@/utils/scroll-to-section";
import { GlowingEffect } from "../ui/glowing-effect";
import { useState, useRef, useEffect } from "react";

export function ProjectCard({ project }: { project: Project }) {
  const [showTechPopup, setShowTechPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  // Show first 3 technologies always
  const displayedTechnologies = project.techStack.slice(0, 3);
  // Get remaining technologies for the popup
  const remainingTechnologies = project.techStack.slice(3);

  const toggleTechPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTechPopup(!showTechPopup);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showTechPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShowTechPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTechPopup]);

  return (
    <div className='relative list-none h-full'>
      <div className='relative rounded-xl border border-background-tertiary p-1.5 md:rounded-2xl md:p-2 group h-full'>
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
          <div className='flex-1'>
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
            <p className='text-sm text-text-secondary leading-relaxed line-clamp-4 mb-5'>
              {project.description}
            </p>
          </div>

          <div className='mt-auto'>
            <div className='flex flex-wrap gap-2 mb-2 relative'>
              {displayedTechnologies.map((tech) => (
                <Badge
                  key={tech}
                  size='md'
                  className='bg-background-tertiary/50 text-text-secondary hover:bg-background-tertiary'
                >
                  {tech}
                </Badge>
              ))}

              {project.techStack.length > 3 && (
                <span
                  ref={triggerRef}
                  className='inline-block'
                  onClick={toggleTechPopup}
                >
                  <Badge
                    size='md'
                    className={`${
                      showTechPopup
                        ? "bg-primary/20"
                        : "bg-background-tertiary/50"
                    } text-text-secondary hover:bg-primary/20 cursor-pointer`}
                  >
                    +{project.techStack.length - 3}
                  </Badge>
                </span>
              )}

              {/* Popup for additional technologies */}
              {showTechPopup && remainingTechnologies.length > 0 && (
                <div
                  ref={popupRef}
                  onClick={(e) => e.stopPropagation()}
                  className='absolute bottom-full left-0 mb-2 p-3 rounded-lg border border-background-tertiary bg-background-secondary/95 backdrop-blur-sm z-10 shadow-lg min-w-[150px] animate-in fade-in-50 zoom-in-95 duration-200'
                >
                  <div className='text-xs font-medium text-text-secondary mb-2'>
                    Additional technologies:
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {remainingTechnologies.map((tech) => (
                      <Badge
                        key={tech}
                        size='md'
                        className='bg-background-tertiary/50 text-text-secondary'
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <span className='text-xs text-text-tertiary italic block pt-1 '>
              {project.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
