import { cn } from "@/lib/utils";
export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "rounded-full px-2 py-1 text-xs hover:opacity-80 transition-opacity duration-300 cursor-pointer",
        size === "sm" && "px-2 py-1 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        size === "lg" && "px-4 py-2 text-base",
        className,
        variant === "default"
          ? "bg-background-secondary text-text-primary"
          : variant === "secondary"
          ? "bg-background-secondary text-text-primary"
          : "border border-background-tertiary text-text-primary"
      )}
    >
      {children}
    </div>
  );
}
