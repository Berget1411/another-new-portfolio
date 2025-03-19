"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IconBlobProps {
  children: React.ReactNode;
  className?: string;
}

export function IconBlob({ children, className }: IconBlobProps) {
  return (
    <motion.div
      className={cn("relative group ", className)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div
        className='absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-color-background-tertiary/30 blur-md -z-10'
        initial={{ scale: 0.8, opacity: 0.5 }}
        whileHover={{ scale: 1.2, opacity: 0.8 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      />
      {children}
    </motion.div>
  );
}
