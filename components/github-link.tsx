"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";

export const GitHubLink = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.div
        onHoverStart={() => setIsTooltipVisible(true)}
        onHoverEnd={() => setIsTooltipVisible(false)}
      >
        <a
          href="https://github.com/Bekione/nextjs-2048-tiles"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          <Github size={24} />
        </a>
        <AnimatePresence>
          {isTooltipVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full w-[12ch] left-0 mb-2 px-2 py-1 bg-popover text-popover-foreground text-sm text-center rounded shadow-md"
            >
              By Bereket
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
