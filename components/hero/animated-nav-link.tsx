"use client";
import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
import { scrollToSection } from "@/utils/scroll-to-section";

interface AnimatedNavLinkProps {
  href: string;
  children: ReactNode;
  index: number;
}

export function AnimatedNavLink({
  href,
  children,
  index,
}: AnimatedNavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isEven = index % 2 === 0;

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      className='relative py-2 cursor-pointer md:w-auto w-full md:px-4'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background slide animation */}
      <motion.div
        className='absolute inset-0 bg-primary/20 md:rounded-md'
        initial={{ x: isMobile && isEven ? "-100%" : "100%" }}
        animate={{
          x: isHovered ? 0 : isMobile && isEven ? "-100%" : "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />

      {/* Text */}
      <div
        onClick={() => scrollToSection(href)}
        className='text-xl md:text-4xl font-bold relative z-10 block text-center md:text-right'
      >
        <motion.span
          animate={{
            color: isHovered
              ? "var(--color-primary)"
              : "var(--color-text-primary)",
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </div>
    </motion.div>
  );
}
