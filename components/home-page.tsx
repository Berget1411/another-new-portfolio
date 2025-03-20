import { Hero } from "./hero";
import { About } from "./about";
import { Projects } from "./projects";
export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
