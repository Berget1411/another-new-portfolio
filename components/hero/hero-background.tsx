"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

// Configuration for the grid and spotlight effect
const TILE_SIZE = 100;
const BASE_RADIUS = 150;
const HOVER_RADIUS = 300;
const TRANSITION_DURATION = 200; // ms
const LERP_SPEED = 0.05; // Controls the "lag" of the spotlight (lower = more lag)

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const targetRadius = useRef(BASE_RADIUS);
  const animationFrame = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const currentRadiusRef = useRef(BASE_RADIUS);

  // Function to update the spotlight mask
  const updateMask = (radius: number, x: number, y: number) => {
    if (spotlightRef.current) {
      const maskValue = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0) 100%)`;
      spotlightRef.current.style.maskImage = maskValue;
      spotlightRef.current.style.webkitMaskImage = maskValue;
    }
  };

  // Animation to smoothly transition the radius
  const startAnimation = useCallback(() => {
    let startTime: number | null = null;
    const startRadius = currentRadiusRef.current;
    const endRadius = targetRadius.current;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / TRANSITION_DURATION, 1);
      const newRadius = startRadius + (endRadius - startRadius) * progress;

      currentRadiusRef.current = newRadius;
      updateMask(
        newRadius,
        currentMouseRef.current.x,
        currentMouseRef.current.y
      );

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, []);

  // Setup mouse tracking and spotlight effect
  useEffect(() => {
    // Skip effects for users with reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    if (!containerRef.current) return;
    const container = containerRef.current;

    // Initialize position to center
    const { width, height } = container.getBoundingClientRect();
    updateMask(BASE_RADIUS, width / 2, height / 2);
    currentMouseRef.current = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate position relative to the container
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top + window.scrollY,
      };
    };

    // Smoothly move the spotlight with a delay
    const smoothMouseMove = () => {
      currentMouseRef.current.x +=
        (mousePositionRef.current.x - currentMouseRef.current.x) * LERP_SPEED;
      currentMouseRef.current.y +=
        (mousePositionRef.current.y - currentMouseRef.current.y) * LERP_SPEED;

      updateMask(
        currentRadiusRef.current,
        currentMouseRef.current.x,
        currentMouseRef.current.y
      );
      animationFrame.current = requestAnimationFrame(smoothMouseMove);
    };

    const handleMouseEnter = () => {
      targetRadius.current = HOVER_RADIUS;
      startAnimation();
    };

    const handleMouseLeave = () => {
      targetRadius.current = BASE_RADIUS;
      startAnimation();
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Start animation loop
    animationFrame.current = requestAnimationFrame(smoothMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [startAnimation]);

  return (
    <div className='absolute inset-0 overflow-hidden' ref={containerRef}>
      {/* Base grid */}
      <div
        ref={gridRef}
        className={cn(
          "absolute inset-0",
          "[background-size:100px_100px]",
          "[background-image:linear-gradient(to_right,var(--color-background-tertiary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-background-tertiary)_1px,transparent_1px)]"
        )}
      />

      {/* Spotlight grid that will be masked */}
      <div
        ref={spotlightRef}
        className={cn(
          "absolute inset-0",
          "[background-size:100px_100px]",
          "[background-image:linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)]"
        )}
      />

      {/* Radial gradient overlay */}
      <div className='pointer-events-none absolute inset-0 bg-[var(--color-background-primary)] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] md:[mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)]'></div>
    </div>
  );
}
