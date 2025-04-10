import { Hero } from "./hero";
import { About } from "./about";
import { Projects } from "./projects";
import { ProjectsFull } from "./projects-full";
import { Separator } from "./ui/separator";
import { TechStack } from "./tech-stack";
import { Contact } from "./contact";
export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Separator />
      <ProjectsFull />
      <Separator />
      <TechStack />
      <Separator />
      <Contact />
    </main>
  );
}
