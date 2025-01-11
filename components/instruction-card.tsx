"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

const InstractionCard = () => {
  const [showInstruction, setShowInstruction] = useState(true);

  const toggleInstructions = () => {
    setShowInstruction((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowInstruction(window.innerWidth >= 1024); // 1024px => 'lg' breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute right-4 bottom-4 w-full z-50">
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 bottom-0 lg:hidden"
        onClick={toggleInstructions}
      >
        <Info className="h-4 w-4" />
      </Button>
      <AnimatePresence>
        {showInstruction && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="ml-auto mr-10 lg:mr-0 w-72 xsm:w-fit"
          >
            <Card>
              <CardContent className="p-4 text-center text-muted-foreground select-none">
                <p>Use arrow keys, WASD or swipe to move tiles</p>
                <p>Add the same numbers to reach 2048!</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstractionCard;
