"use client";

import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  onClick?: () => void;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  onClick,
}: MagicCardProps) {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mounted) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  }, [mounted]);

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={
        {
          "--gradientSize": `${gradientSize}px`,
          "--gradientColor": gradientColor,
          "--gradientOpacity": gradientOpacity,
        } as React.CSSProperties
      }
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6",
        "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500",
        "before:bg-[radial-gradient(var(--gradientSize)_circle_at_var(--x,0)_var(--y,0),var(--gradientColor),transparent_70%)]",
        "hover:before:opacity-[var(--gradientOpacity)]",
        onClick ? "cursor-pointer" : "",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default MagicCard;