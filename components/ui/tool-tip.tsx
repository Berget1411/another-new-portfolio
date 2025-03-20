"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ToolTip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "absolute z-50 -top-9 left-1/2 transform -translate-x-1/2 bg-background-secondary text-text-primary px-2.5 py-1.5 rounded-md shadow-md text-xs font-medium whitespace-nowrap",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
