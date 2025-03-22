import { ProjectFullCard } from "./project-full-card";
import { Separator } from "../ui/separator";
import { projects } from "@/assets/projects";

// Create a type based on the imported projects
export type Project = {
  title: string;
  description: string;
  date: string;
  github?: string;
  link?: string;
  image: string | null;
  dev: boolean;
};

// Map imported projects to the format expected by ProjectFullCard
const formattedProjects = projects.map((project) => ({
  title: project.title,
  description: project.longDescription,
  date: project.date,
  github: project.github || "", // Default to empty string if undefined
  link: project.demo || "", // Default to empty string if undefined
  image: project.image || null,
  dev: project.devMode,
}));

const firstDevProjectIndex = formattedProjects.findIndex(
  (project) => project.dev
);

export function ProjectsFull() {
  return (
    <section className='main-container py-20'>
      <div className='flex flex-col relative'>
        {formattedProjects.map((project, index) => (
          <div key={project.title}>
            <ProjectFullCard
              key={project.title}
              project={project}
              reverse={index % 2 !== 0}
              index={index}
            />
            {index === firstDevProjectIndex && firstDevProjectIndex !== -1 && (
              <Separator position='left'>
                <h2 className='text-2xl md:text-4xl font-bold mb-0 text-center'>
                  Projects in development
                </h2>
              </Separator>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
