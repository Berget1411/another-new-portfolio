import { ProjectFullCard } from "./project-full-card";

const projects = [
  {
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    github: "https://github.com/project1",
    link: "https://ludvigbergstrom.com",
    image: null,
  },
  {
    title: "Project 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",

    github: "https://github.com/project2",
    link: "https://project2.com",
    image: null,
  },
  {
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",

    github: "https://github.com/project3",
    link: "https://project3.com",
    image: null,
  },
  {
    title: "Project 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",

    github: "https://github.com/project4",
    link: "https://project4.com",
    image: null,
  },
  {
    title: "Project 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",

    github: "https://github.com/project5",
    link: "https://project5.com",
    image: null,
  },
  {
    title: "Project 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Sep, 2024",
    github: "https://github.com/project6",
    link: "https://project6.com",
    image: null,
  },
];

export type Project = (typeof projects)[number];

export function ProjectsFull() {
  return (
    <section className='main-container py-20'>
      <div className='flex flex-col  relative'>
        {projects.map((project, index) => (
          <ProjectFullCard
            key={project.title}
            project={project}
            reverse={index % 2 !== 0}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
