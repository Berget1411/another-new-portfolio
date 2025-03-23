"use client";
import { cn } from "@/lib/utils";
import { ToolTip } from "./tool-tip";
import { useState } from "react";
import Link from "next/link";
import React from "react";

export function Icon({
  icon,
  className,
  tooltip,
  size = "md",
  href,
}: {
  icon: React.ReactNode;
  className?: string;
  tooltip?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Set size class to be applied to the container
  const sizeClass = cn(
    size === "sm" && "w-4 h-4",
    size === "md" && "w-5 h-5",
    size === "lg" && "w-8 h-8"
  );

  // Clone icon with proper typing
  const sizedIcon = React.isValidElement(icon)
    ? React.cloneElement(
        icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
        {
          width: size === "sm" ? 16 : size === "md" ? 20 : 32,
          height: size === "sm" ? 16 : size === "md" ? 20 : 32,
        }
      )
    : icon;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        sizeClass,
        className
      )}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {href ? <Link href={href}>{sizedIcon}</Link> : sizedIcon}
      {tooltip && showTooltip && <ToolTip>{tooltip}</ToolTip>}
    </div>
  );
}
