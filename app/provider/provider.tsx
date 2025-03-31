import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SpeedInsights />
      <Analytics />
      {children}
    </>
  );
}
