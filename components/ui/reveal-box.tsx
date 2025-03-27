"use client";
import { motion, useReducedMotion, Variant } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type RevealBoxProps = {
  children: React.ReactNode;
  isVisible?: boolean;
  className?: string;
  direction?: "left" | "top";
  color?: "primary" | "secondary" | "tertiary" | "quaternary";
  duration?: number;
  delay?: number;
};

export function RevealBox({
  children,
  isVisible = true,
  className,
  direction = "left",
  color = "secondary",
  duration = 1.7,
  delay = 0,
}: RevealBoxProps) {
  const prefersReducedMotion = useReducedMotion();
  const [childrenAreVisible, setChildrenAreVisible] = useState(false);

  // Set background color class based on color prop
  const bgColorClass = {
    primary: "bg-background-primary",
    secondary: "bg-background-secondary",
    tertiary: "bg-background-tertiary",
    quaternary: "bg-background-quaternary",
  }[color];

  // Set initial and animate variants based on direction
  const boxVariants: { hidden: Variant; visible: Variant } = {
    hidden: {
      x: direction === "left" ? "-100%" : 0,
      y: direction === "top" ? "-100%" : 0,
    },
    visible: {
      x: direction === "left" ? "100%" : 0,
      y: direction === "top" ? "100%" : 0,
      transition: {
        duration: duration,
        ease: "easeInOut",
        delay: delay,
      },
    },
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      setChildrenAreVisible(true);
      return;
    }

    if (isVisible) {
      // Show content after the reveal animation is about 1/3 complete
      const timer = setTimeout(() => {
        setChildrenAreVisible(true);
      }, (duration * 1000) / 3);

      return () => clearTimeout(timer);
    }
  }, [isVisible, prefersReducedMotion, duration]);

  // If reduced motion is preferred, just show the content
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("relative w-fit overflow-hidden", className)}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: childrenAreVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Reveal overlay */}
      <motion.div
        className={cn("absolute inset-0 w-full h-full", bgColorClass)}
        initial='hidden'
        animate={isVisible ? "visible" : "hidden"}
        variants={boxVariants}
        style={{
          originX: direction === "left" ? 0 : 0.5,
          originY: direction === "top" ? 0 : 0.5,
        }}
      />
    </div>
  );
}
