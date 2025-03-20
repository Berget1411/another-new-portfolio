import { Separator } from "../ui/separator";
import { ProjectCard } from "./project-card";

const projects = [
  {
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project1",
    link: "https://project1.com",
  },
  {
    title: "Project 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project2",
    link: "https://project2.com",
  },
  {
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project3",
    link: "https://project3.com",
  },
  {
    title: "Project 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project4",
    link: "https://project4.com",
  },
  {
    title: "Project 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project5",
    link: "https://project5.com",
  },
  {
    title: "Project 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/project6",
    link: "https://project6.com",
  },
];

export type Project = (typeof projects)[number];

export function Projects() {
  return (
    <div>
      <Separator>
        <h2 className='text-2xl md:text-5xl font-bold mb-0 text-center'>
          Projects
        </h2>
      </Separator>
      <div className='container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
