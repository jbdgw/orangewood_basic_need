"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
  delay?: number;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor,
  duration,
  delay,
}: BoxRevealProps) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, (delay || 0.5) * 1000 + (duration || 0.5) * 1000);

    return () => clearTimeout(timer);
  }, [delay, duration]);

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 75,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          duration: duration ?? 0.5,
          delay: delay ?? 0.5,
        }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: {
            left: 0,
          },
          visible: {
            left: "100%",
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          duration: duration ?? 0.5,
          ease: "easeInOut",
          delay: delay ?? 0.5,
        }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: boxColor ?? "#5046e6",
          zIndex: 20,
        }}
        onAnimationComplete={() => setIsComplete(true)}
      />
    </div>
  );
};

export default BoxReveal;