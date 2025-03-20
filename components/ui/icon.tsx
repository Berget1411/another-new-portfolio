"use client";
import { cn } from "@/lib/utils";
import { ToolTip } from "./tool-tip";
import { useState } from "react";

export function Icon({
  icon,
  className,
  tooltip,
}: {
  icon: React.ReactNode;
  className?: string;
  tooltip?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={cn("w-4 h-4 relative", className)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {icon}
      {tooltip && showTooltip && <ToolTip>{tooltip}</ToolTip>}
    </div>
  );
}
