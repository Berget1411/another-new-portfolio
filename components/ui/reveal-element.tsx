"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ANIMATION_DURATION = 1700; // matching the original

export function RevealElement({
  children,
  isVisible = true,
  className,
  color = "secondary",
  direction = "left",
}: {
  children: React.ReactNode;
  isVisible?: boolean;
  className?: string;
  direction?: "left" | "top";
  color?: "primary" | "secondary" | "tertiary" | "quaternary";
}) {
  const prefersReducedMotion = useReducedMotion();
  const [childrenAreVisible, setChildrenAreVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Color mapping
  const bgColorClass = {
    primary: "bg-background-primary",
    secondary: "bg-background-secondary",
    tertiary: "bg-background-tertiary",
    quaternary: "bg-background-quaternary",
  }[color];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (prefersReducedMotion) {
      setChildrenAreVisible(true);
      return;
    }

    if (!isVisible) return;

    const timer = setTimeout(() => {
      setChildrenAreVisible(true);
    }, ANIMATION_DURATION / 3);

    return () => clearTimeout(timer);
  }, [isVisible, prefersReducedMotion, mounted]);

  // Always render the same structure to prevent hydration mismatch
  return (
    <div className={cn("relative w-fit overflow-hidden", className)}>
      {/* Content with conditional opacity */}
      <div
        className={cn(
          "transition-opacity duration-300",
          childrenAreVisible || !mounted ? "opacity-100" : "opacity-0"
        )}
      >
        {children}
      </div>

      {/* Animated overlay - only render if mounted and not reduced motion */}
      {mounted && !prefersReducedMotion && (
        <motion.div
          className={cn("absolute inset-0 w-[200%] h-[200%]", bgColorClass)}
          initial={{
            left: direction === "left" ? "-200%" : 0,
            top: direction === "top" ? "-200%" : 0,
          }}
          animate={{
            left:
              direction === "left" && isVisible
                ? "100%"
                : direction === "left"
                ? "-200%"
                : 0,
            top:
              direction === "top" && isVisible
                ? "100%"
                : direction === "top"
                ? "-200%"
                : 0,
          }}
          transition={{
            duration: ANIMATION_DURATION / 1000, // convert ms to seconds for framer
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
