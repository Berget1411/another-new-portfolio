"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { mainTechStack, otherTechStack } from "@/assets/tech-stack";

export function TechStack() {
  return (
    <section className='py-16 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6 text-center'>
          My Tech Stack
        </h2>
        <p className='text-text-secondary text-center max-w-3xl mx-auto mb-12'>
          Technologies and tools I use to bring ideas to life
        </p>

        <ul className='grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2'>
          {/* Frontend */}
          <TechGridItem
            area='md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]'
            title='Frontend'
            technologies={mainTechStack.slice(0, 4)}
          />

          {/* Backend */}
          <TechGridItem
            area='md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]'
            title='Backend & Database'
            technologies={mainTechStack.slice(4, 7)}
          />

          {/* Featured Tech */}
          <TechGridItem
            area='md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]'
            title='State Management'
            technologies={[
              ...mainTechStack.slice(7),
              ...otherTechStack.slice(9, 11),
            ]}
            featured
          />

          {/* Languages & Runtime */}
          <TechGridItem
            area='md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]'
            title='Languages & Runtime'
            technologies={otherTechStack.slice(0, 2)}
          />

          {/* Tools & Services */}
          <TechGridItem
            area='md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]'
            title='Development Tools'
            technologies={otherTechStack.slice(8, 10)}
          />
        </ul>
      </div>
    </section>
  );
}

interface TechGridItemProps {
  area: string;
  title: string;
  technologies: Array<{ name: string; icon: any }>;
  featured?: boolean;
}

const TechGridItem = ({
  area,
  title,
  technologies,
  featured = false,
}: TechGridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className='relative h-full rounded-2.5xl border border-background-tertiary p-2 md:rounded-3xl md:p-3'>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className='relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 bg-background-secondary/30 backdrop-blur-sm'>
          <div className='relative flex flex-1 flex-col justify-between gap-3'>
            <h3 className='text-xl/[1.375rem] font-semibold -tracking-4 md:text-2xl/[1.875rem]'>
              {title}
            </h3>

            <div className='grid grid-cols-2 gap-4 mt-4'>
              {technologies.map((tech) => (
                <div key={tech.name} className='flex items-center gap-2'>
                  <tech.icon
                    className={`${
                      featured ? "h-7 w-7" : "h-5 w-5"
                    } text-primary`}
                  />
                  <span className={`${featured ? "text-base" : "text-sm"}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
