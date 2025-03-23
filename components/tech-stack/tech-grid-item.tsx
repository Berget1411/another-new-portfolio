"use client";
import { GlowingEffect } from "../ui/glowing-effect";
import { ToolTip } from "../ui/tool-tip";
import { useState } from "react";
import { ElementType } from "react";

interface TechGridItemProps {
  area: string;
  title: string;
  technologies: Array<{ name: string; icon: ElementType }>;
  icon: React.ReactNode; // This can stay ReactNode as it's directly rendered, not used as a component
  leftAligned?: boolean;
}

export function TechGridItem({
  area,
  title,
  technologies,
  icon,
  leftAligned = false,
}: TechGridItemProps) {
  return (
    <div className={`h-full min-h-[12rem] md:min-h-[14rem] ${area}`}>
      <div className='relative h-full rounded-xl border border-background-tertiary p-1.5 md:rounded-2xl md:p-2'>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className='relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-3 md:p-4 bg-background-secondary/30 backdrop-blur-sm'>
          <div className='flex items-center gap-2 md:gap-3 mb-2 md:mb-3'>
            <div className='w-fit rounded-md border border-background-tertiary p-1.5 md:p-2 bg-background-secondary/50'>
              <div>
                <span className='text-primary'>{icon}</span>
              </div>
            </div>
            <h3 className='text-base md:text-lg font-semibold text-text-primary'>
              {title}
            </h3>
          </div>

          <div className='flex-1'>
            <div className={leftAligned ? "md:max-w-[50%]" : ""}>
              <div className='grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3'>
                {technologies.map((tech) => (
                  <TechIcon key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type TechIconProps = {
  tech: { name: string; icon: ElementType };
  size?: "sm" | "md" | "lg";
};

const TechIcon = ({ tech, size = "sm" }: TechIconProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeClasses = {
    sm: "h-5 w-5 md:h-6 md:w-6",
    md: "h-6 w-6 md:h-7 md:w-7",
    lg: "h-8 w-8 md:h-10 md:w-10",
  };

  const IconComponent = tech.icon;

  return (
    <div
      className='relative flex items-center gap-1.5'
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className='p-1.5 md:p-2 rounded-lg bg-background-tertiary/30 hover:bg-background-tertiary transition-colors duration-200 cursor-pointer flex items-center justify-center'>
        <IconComponent className={`${sizeClasses[size]} text-primary`} />
      </div>
      <span className='text-xs text-text-secondary truncate max-w-[60px] md:max-w-[80px]'>
        {tech.name.split(" ")[0]}
      </span>
      {showTooltip && <ToolTip>{tech.name}</ToolTip>}
    </div>
  );
};
