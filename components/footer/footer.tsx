import { Icon } from "../ui/icon";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://github.com/Berget1411",
    icon: <Github />,
    tooltip: "Github",
  },
  {
    href: "https://www.linkedin.com/in/ludvig-bergstrom/",
    icon: <Linkedin />,
    tooltip: "Linkedin",
  },
  {
    href: "mailto:ludvig.benjaminbergstrom@gmail.com",
    icon: <Mail />,
    tooltip: "Email",
  },
];
export function Footer() {
  return (
    <footer className=' py-8 border-t border-background-tertiary'>
      <div className='main-container flex justify-between items-center'>
        <p className='text-center text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} Ludvig Bergström
        </p>
        <div className='flex justify-center items-center gap-4'>
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='hover:text-primary transition-colors duration-300'
            >
              <Icon icon={link.icon} tooltip={link.tooltip} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
