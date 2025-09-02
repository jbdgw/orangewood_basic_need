"use client";

import React from "react";
import { motion } from "framer-motion";

interface BoxRevealProps {
  children: React.ReactNode;
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
      />
    </div>
  );
};

export default BoxReveal;