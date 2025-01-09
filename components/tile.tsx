"use client";

import { cn } from "@/lib/utils";

const colors = {
  2: "bg-teal-400 text-white",
  4: "bg-teal-500 text-white",
  8: "bg-rose-400 text-white",
  16: "bg-rose-500 text-white",
  32: "bg-fuchsia-500 text-white",
  64: "bg-fuchsia-600 text-white",
  128: "bg-amber-400 text-white",
  256: "bg-amber-500 text-white",
  512: "bg-violet-500 text-white",
  1024: "bg-violet-600 text-white",
  2048: "bg-emerald-500 text-white",
};

interface TileProps {
  value: number;
  isNew?: boolean
  isMerged?: boolean
}


export function Tile({ value, isNew, isMerged }: TileProps) {

  return (
    <div
      className={cn(
        "w-full h-full rounded-lg flex items-center justify-center text-4xl font-bold shadow-lg overflow-hidden",
          (colors[value as keyof typeof colors] || "bg-violet-700 text-white")
      )}
    >
     {value}
    </div>
  );
}
