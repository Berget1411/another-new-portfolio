import { cn } from "@/lib/utils";

export function HeroBackground() {
  return (
    <div
      className={cn(
        "absolute inset-0",
        "[background-size:100px_100px]",
        "[background-image:linear-gradient(to_right,var(--color-background-tertiary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-background-tertiary)_1px,transparent_1px)]"
      )}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className='pointer-events-none absolute inset-0 bg-[var(--color-background-primary)] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] md:[mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)]'></div>
    </div>
  );
}
