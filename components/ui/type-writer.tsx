"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  align?: "left" | "center" | "right"; // New prop for alignment
}

export function TypeWriter({
  text,
  speed = 100,
  delay = 0,
  className = "",
  showCursor = true,
  align,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Determine text alignment classes
  const alignmentClass =
    align &&
    {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Initial delay before starting
    if (!isTyping && currentIndex === 0) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    // Typing effect
    if (isTyping && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);

        // Check if typing is complete
        if (currentIndex + 1 === text.length) {
          setIsComplete(true);
        }
      }, speed);
      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [text, speed, delay, currentIndex, isTyping]);

  return (
    <span className={cn(alignmentClass, className)}>
      {displayText}
      {showCursor && (
        <span className={`cursor ${isComplete ? "cursor-blink" : ""}`}>
          &nbsp;
        </span>
      )}
    </span>
  );
}
