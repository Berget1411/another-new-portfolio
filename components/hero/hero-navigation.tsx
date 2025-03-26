import { AnimatedNavLink } from "./animated-nav-link";

export function HeroNavigation() {
  return (
    <div className='flex flex-col justify-center z-30 md:w-auto w-full'>
      <div className='bg-[var(--color-background-primary)] md:px-12 py-4 md:py-8 relative w-full'>
        <nav className='w-full'>
          <ul className='space-y-3 md:space-y-8 w-full max-md:text-center'>
            <li>
              <AnimatedNavLink href='about' index={0}>
                ABOUT
              </AnimatedNavLink>
            </li>
            <li>
              <AnimatedNavLink href='projects' index={1}>
                PROJECTS
              </AnimatedNavLink>
            </li>
            <li>
              <AnimatedNavLink href='tech-stack' index={2}>
                TECH-STACK
              </AnimatedNavLink>
            </li>
            <li>
              <AnimatedNavLink href='contact' index={3}>
                CONTACT
              </AnimatedNavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
