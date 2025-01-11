"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const colors = {
    2: "bg-gradient-to-r from-teal-200 to-teal-300 text-white",
    4: "bg-gradient-to-r from-teal-500 to-teal-600 text-white",
    8: "bg-gradient-to-r from-rose-400 to-rose-500 text-white",
    16: "bg-gradient-to-r from-rose-500 to-rose-600 text-white",
    32: "bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white",
    64: "bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white",
    128: "bg-gradient-to-r from-amber-400 to-amber-500 text-white",
    256: "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
    512: "bg-gradient-to-br from-violet-400 to-violet-800 text-white",
    1024: "bg-gradient-to-r from-violet-600 to-violet-700 text-white",
    2048: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
};

interface TileProps {
  value: number;
  isNew?: boolean;
  isMerged?: boolean;
}

const gifNumbers = {
    2: '/2.webp',
    4: '/4.webp',
    8: '/8.webp',
    16: '/16.webp',
    32: '/32.gif',
    64: '/64.gif',
    128: '/128.gif',
    1024: '/1024.gif',
    2048: '/2048.gif',
};

export function Tile({ value, isNew, isMerged }: TileProps) {
  const hasGif = Object.keys(gifNumbers).map(Number).includes(value);

  return (
    <motion.div
      initial={isNew ? { scale: 0 } : { scale: 1 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "w-full h-full rounded-lg flex items-center justify-center text-4xl font-bold shadow-xl overflow-hidden",
        !hasGif &&
          (colors[value as keyof typeof colors] || "bg-violet-700 text-white"),
        isMerged && "animate-pop"
      )}
    >
      {hasGif ? (
        <div className="relative w-full h-full">
          <Image
            src={gifNumbers[value as keyof typeof gifNumbers]}
            alt={`Number ${value}`}
            fill
            sizes="(max-width: 600px) 65px, (max-width: 768px) 85px, 100px"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        value
      )}
    </motion.div>
  );
}
