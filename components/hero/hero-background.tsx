"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Configuration for the grid and glow effect
const GRID_SIZE = 100;
const GLOW_RADIUS = 300;
const MOBILE_ANIMATION_INTERVAL = 3000;

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mobileIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobileWidth = 768;
      setIsMobile(window.innerWidth < mobileWidth);
    };

    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // Draw the grid with glow effect
  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Base grid color (faded blue)
      const baseGridColor = "rgba(100, 149, 237, 0.15)"; // Faded cornflower blue
      const glowGridColor = "rgba(100, 149, 237, 0.8)"; // Brighter blue for glow

      // Draw base grid
      ctx.strokeStyle = baseGridColor;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw glow effect if hovering or on mobile
      if (isHovering || isMobile) {
        const gradient = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          GLOW_RADIUS
        );

        gradient.addColorStop(0, glowGridColor);
        gradient.addColorStop(0.3, "rgba(100, 149, 237, 0.4)");
        gradient.addColorStop(1, "rgba(100, 149, 237, 0)");

        // Create a clipping mask for the glow effect
        ctx.save();
        ctx.globalCompositeOperation = "source-over";

        // Draw glowing grid lines within the radius
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;

        // Find grid lines near the mouse position
        const startX = Math.max(
          0,
          Math.floor((mousePos.x - GLOW_RADIUS) / GRID_SIZE) * GRID_SIZE
        );
        const endX = Math.min(
          width,
          Math.ceil((mousePos.x + GLOW_RADIUS) / GRID_SIZE) * GRID_SIZE
        );
        const startY = Math.max(
          0,
          Math.floor((mousePos.y - GLOW_RADIUS) / GRID_SIZE) * GRID_SIZE
        );
        const endY = Math.min(
          height,
          Math.ceil((mousePos.y + GLOW_RADIUS) / GRID_SIZE) * GRID_SIZE
        );

        // Draw vertical glow lines
        for (let x = startX; x <= endX; x += GRID_SIZE) {
          const distance = Math.abs(x - mousePos.x);
          if (distance <= GLOW_RADIUS) {
            const intensity = 1 - distance / GLOW_RADIUS;
            ctx.globalAlpha = intensity;
            ctx.beginPath();
            ctx.moveTo(x, Math.max(0, mousePos.y - GLOW_RADIUS));
            ctx.lineTo(x, Math.min(height, mousePos.y + GLOW_RADIUS));
            ctx.stroke();
          }
        }

        // Draw horizontal glow lines
        for (let y = startY; y <= endY; y += GRID_SIZE) {
          const distance = Math.abs(y - mousePos.y);
          if (distance <= GLOW_RADIUS) {
            const intensity = 1 - distance / GLOW_RADIUS;
            ctx.globalAlpha = intensity;
            ctx.beginPath();
            ctx.moveTo(Math.max(0, mousePos.x - GLOW_RADIUS), y);
            ctx.lineTo(Math.min(width, mousePos.x + GLOW_RADIUS), y);
            ctx.stroke();
          }
        }

        ctx.restore();
      }
    },
    [mousePos, isHovering, isMobile]
  );

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawGrid(ctx, canvas.width, canvas.height);
    animationRef.current = requestAnimationFrame(animate);
  }, [drawGrid]);

  // Handle canvas setup and resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Start animation
  useEffect(() => {
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Mobile random position animation
  useEffect(() => {
    if (!isMobile) {
      if (mobileIntervalRef.current) {
        clearInterval(mobileIntervalRef.current);
        mobileIntervalRef.current = null;
      }
      return;
    }

    const createRandomPosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
      });
      setIsHovering(true);
    };

    // Set initial position
    createRandomPosition();

    // Set interval for random positions
    mobileIntervalRef.current = setInterval(
      createRandomPosition,
      MOBILE_ANIMATION_INTERVAL
    );

    return () => {
      if (mobileIntervalRef.current) {
        clearInterval(mobileIntervalRef.current);
      }
    };
  }, [isMobile]);

  // Mouse event handlers
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <div className='absolute inset-0 overflow-hidden' ref={containerRef}>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        style={{ background: "transparent" }}
      />

      {/* Radial gradient overlay for fade effect */}
      <div className='pointer-events-none absolute inset-0 bg-[var(--color-background-primary)] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] md:[mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)]' />
    </div>
  );
}
