import { GrLanguage } from "react-icons/gr";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import { RiNextjsFill, RiReactjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiRedis,
  SiDrizzle,
  SiSupabase,
  SiReactquery,
  SiStripe,
  SiPython,
  SiDocker,
  SiGit,
  SiGo,
  SiExpo,
  SiFirebase,
} from "react-icons/si";
import { FaCode, FaGithub } from "react-icons/fa";
import { TbBrandFramerMotion } from "react-icons/tb";

export const techStack = {
  frontend: [
    {
      name: "React",
      icon: RiReactjsFill,
    },
    {
      name: "Next.js",
      icon: RiNextjsFill,
    },
    {
      name: "Typescript",
      icon: SiTypescript,
    },
    {
      name: "Tailwind CSS",
      icon: RiTailwindCssFill,
    },
    {
      name: "Framer Motion",
      icon: TbBrandFramerMotion,
    },
    {
      name: "React Query",
      icon: SiReactquery,
    },
    {
      name: "Zustand",
      icon: FaCode,
    },
    {
      name: "Expo & React Native",
      icon: SiExpo,
    },
  ],
  backend: [
    {
      name: "Node.js",
      icon: SiNodedotjs,
    },
    {
      name: "Express",
      icon: SiExpress,
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
    },
    {
      name: "Drizzle",
      icon: SiDrizzle,
    },
    {
      name: "Redis",
      icon: SiRedis,
    },
    {
      name: "Supabase",
      icon: SiSupabase,
    },
    {
      name: "Python",
      icon: SiPython,
    },
    {
      name: "Go",
      icon: SiGo,
    },
    {
      name: "Firebase",
      icon: SiFirebase,
    },
  ],
  other: [
    {
      name: "Git",
      icon: SiGit,
    },
    {
      name: "Docker",
      icon: SiDocker,
    },
    {
      name: "Stripe",
      icon: SiStripe,
    },
    {
      name: "Excel",
      icon: PiMicrosoftExcelLogoBold,
    },
    {
      name: "i18n",
      icon: GrLanguage,
    },
    {
      name: "GitHub",
      icon: FaGithub,
    },
  ],
};
