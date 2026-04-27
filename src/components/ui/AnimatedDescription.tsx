"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface AnimatedDescriptionProps {
  text: string;
  className?: string;
  mode?: "word" | "paragraph" | "random";
}

export default function AnimatedDescription({ 
  text, 
  className = "", 
  mode = "random" 
}: AnimatedDescriptionProps) {
  
  // Decide the mode randomly if set to random
  const activeMode = useMemo(() => {
    if (mode === "random") {
      return Math.random() > 0.5 ? "word" : "paragraph";
    }
    return mode;
  }, [mode, text]);

  if (activeMode === "paragraph") {
    // Split by new lines or sentences to create small paragraphs/blocks
    const blocks = text.split(/(?<=[.!?])\s+/);
    return (
      <div className={className}>
        {blocks.map((block, i) => (
          <motion.span
            key={i}
            className="inline-block hover-reveal-text cursor-default mr-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            {block}{" "}
          </motion.span>
        ))}
      </div>
    );
  }

  // Word mode
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block hover-reveal-text cursor-default mr-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.01 }}
          viewport={{ once: true }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
