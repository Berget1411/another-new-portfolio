"use client";
import { TechGridItem } from "./tech-grid-item";
import { techStack } from "@/assets/tech-stack";
import { CgWebsite, CgServer } from "react-icons/cg";
import { IoCodeSlash } from "react-icons/io5";

export function TechStack() {
  return (
    <section className='py-6 px-3 md:py-10 md:px-6' id='tech-stack'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center'>
          My Tech Stack
        </h2>
        <p className='text-text-secondary text-center max-w-2xl mx-auto mb-5 md:mb-8 text-sm md:text-base'>
          Technologies and tools I use to bring ideas to life
        </p>

        <ul className='grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-2 lg:gap-4'>
          {/* Frontend */}
          <TechGridItem
            area='md:[grid-area:1/1/2/7] lg:[grid-area:1/1/2/7]'
            title='Frontend'
            technologies={techStack.frontend}
            icon={<CgWebsite className='h-4 w-4 md:h-5 md:w-5' />}
          />

          {/* Backend */}
          <TechGridItem
            area='md:[grid-area:1/7/2/13] lg:[grid-area:1/7/2/13]'
            title='Backend'
            technologies={techStack.backend}
            icon={<CgServer className='h-4 w-4 md:h-5 md:w-5' />}
          />

          {/* Other - full width with left-aligned content */}
          <TechGridItem
            area='md:[grid-area:2/1/3/13] lg:[grid-area:2/1/3/13]'
            title='Other Tools'
            technologies={techStack.other}
            icon={<IoCodeSlash className='h-4 w-4 md:h-5 md:w-5' />}
            leftAligned={true}
          />
        </ul>
      </div>
    </section>
  );
}
