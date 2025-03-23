"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

// Configuration for the grid and spotlight effect
const BASE_RADIUS = 150;
const HOVER_RADIUS = 300;
const TRANSITION_DURATION = 200; // ms
const LERP_SPEED = 0.05; // Controls the "lag" of the spotlight (lower = more lag)
const MOBILE_ANIMATION_INTERVAL = 3000; // Time between random spotlight positions on mobile

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const targetRadius = useRef(BASE_RADIUS);
  const animationFrame = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const currentRadiusRef = useRef(BASE_RADIUS);
  const [isMobile, setIsMobile] = useState(false);
  const mobileIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Function to create random spotlight position for mobile
  const createRandomSpotlight = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const randomX = Math.random() * rect.width;
    const randomY = Math.random() * rect.height;

    mousePositionRef.current = { x: randomX, y: randomY };

    // Alternate between large and small radius
    targetRadius.current =
      targetRadius.current === BASE_RADIUS ? HOVER_RADIUS : BASE_RADIUS;

    startAnimation();
  }, [startAnimation]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobileWidth = 768;
      setIsMobile(window.innerWidth < mobileWidth);
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  // Setup mouse tracking and spotlight effect
  useEffect(() => {
    // Skip server-side rendering
    if (typeof window === "undefined") return;

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

    // Define event handlers at this scope level so they're available for cleanup
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isMobile) {
        const rect = container.getBoundingClientRect();
        // Calculate position relative to the container
        mousePositionRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top + window.scrollY,
        };
      }
    };

    const mouseEnterHandler = () => {
      if (!isMobile) {
        targetRadius.current = HOVER_RADIUS;
        startAnimation();
      }
    };

    const mouseLeaveHandler = () => {
      if (!isMobile) {
        targetRadius.current = BASE_RADIUS;
        startAnimation();
      }
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

    // Start animation loop
    animationFrame.current = requestAnimationFrame(smoothMouseMove);

    // Mobile-specific random animation
    if (isMobile) {
      // Clear any previous interval
      if (mobileIntervalRef.current) {
        clearInterval(mobileIntervalRef.current);
      }

      // Set initial random position
      createRandomSpotlight();

      // Set interval for continuous random positions
      mobileIntervalRef.current = setInterval(
        createRandomSpotlight,
        MOBILE_ANIMATION_INTERVAL
      );
    }
    // Desktop mouse-based animation
    else {
      // Add event listeners for desktop interaction
      window.addEventListener("mousemove", mouseMoveHandler);
      container.addEventListener("mouseenter", mouseEnterHandler);
      container.addEventListener("mouseleave", mouseLeaveHandler);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (mobileIntervalRef.current) {
        clearInterval(mobileIntervalRef.current);
      }

      // Clean up event listeners (now we can always reference these variables)
      window.removeEventListener("mousemove", mouseMoveHandler);
      if (container) {
        container.removeEventListener("mouseenter", mouseEnterHandler);
        container.removeEventListener("mouseleave", mouseLeaveHandler);
      }
    };
  }, [startAnimation, createRandomSpotlight, isMobile]);

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
