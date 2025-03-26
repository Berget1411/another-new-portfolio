import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Icon } from "../ui/icon";

const media = [
  {
    icon: <Github />,
    tooltip: "GitHub",
    href: "https://github.com/Berget1411",
  },
  {
    icon: <Linkedin />,
    tooltip: "LinkedIn",
    href: "https://www.linkedin.com/in/ludvig-bergstrom/",
  },
  {
    icon: <Mail />,
    tooltip: "Email",
    href: "mailto:ludvig.benjaminbergstrom@gmail.com",
  },
];
export function HeroMedia() {
  return (
    <div className='flex gap-5 md:gap-8 mt-3 md:mt-6 max-md:justify-center'>
      {media.map((item) => (
        <Link
          key={item.tooltip}
          href={item.href}
          target='_blank'
          rel='noopener noreferrer'
          className='text-text-secondary hover:text-primary transition-colors'
        >
          <Icon icon={item.icon} tooltip={item.tooltip} size='lg' />
        </Link>
      ))}
    </div>
  );
}
