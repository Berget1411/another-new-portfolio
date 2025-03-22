import { cn } from "@/utils/cn"; // Assuming you have a cn utility

interface SeparatorProps {
  children?: React.ReactNode;
  className?: string;
  position?: "left" | "center" | "right";
}

export function Separator({
  children,
  className,
  position = "center",
}: SeparatorProps) {
  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center my-8",
        className
      )}
    >
      {children ? (
        <>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full h-px bg-background-tertiary'></div>
          </div>
          <div
            className={cn(
              "relative z-10 bg-background-primary",
              position === "left"
                ? "text-left ml-0 mr-auto pr-6"
                : position === "right"
                ? "text-right ml-auto mr-0 pl-6"
                : "text-center mx-auto px-6"
            )}
          >
            {children}
          </div>
        </>
      ) : (
        <div className='w-full h-px bg-background-tertiary/50'></div>
      )}
    </div>
  );
}
