import { CSSProperties, ReactElement, cloneElement } from "react";

import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}

const AnimatedShinyText = ({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) => {
  return (
    <span
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        // Shimmer effect
        "inline-block animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%]",

        // Shimmer gradient - more visible
        "bg-gradient-to-r from-transparent via-white/60 via-50% to-transparent",

        className,
      )}
    >
      {children}
    </span>
  );
};

export default AnimatedShinyText;