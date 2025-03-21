import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "outline" | "icon";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export function Button({
  children,
  className,
  size = "md",
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-lg hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center justify-center gap-2",
        // Sizes
        size === "sm" && "px-2 py-1 text-xs",
        size === "md" && "px-3 py-2 text-sm",
        size === "lg" && "px-4 py-2 text-base",
        // Icon size should be square with equal padding
        variant === "icon" && size === "sm" && "p-1 w-6 h-6",
        variant === "icon" && size === "md" && "p-1.5 w-8 h-8",
        variant === "icon" && size === "lg" && "p-2 w-10 h-10",
        // Variants
        variant === "default" && "bg-background-secondary text-text-primary",
        variant === "secondary" && "bg-background-tertiary text-text-primary",
        variant === "outline" &&
          "border border-background-tertiary text-text-primary",
        variant === "icon" &&
          "text-text-secondary hover:text-text-primary border border-transparent hover:border-background-tertiary bg-transparent",
        className
      )}
    >
      {children}
    </button>
  );
}
