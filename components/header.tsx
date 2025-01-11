"use client"
import { ThemeToggle } from "./theme-toggler";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex items-center sm:items-start justify-between p-2 px-4 md:p-4 z-40">
      <div className="flex flex-col items-center">
        <span className="absolute mx-auto py-2 sm:py-4 flex border w-fit animated-gradient bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-4xl cs-sm:text-5xl c-md:text-6xl box-content font-extrabold text-transparent text-center select-none">
          2048
        </span>
        <h1 className="relative top-0 w-fit h-auto py-2 sm:py-4 justify-center flex animated-gradient bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-4xl cs-sm:text-5xl c-md:text-6xl font-extrabold text-transparent text-center select-auto">
          2048
        </h1>
        <p className="text-muted-foreground font-mono text-xs sm:text-sm -mt-3">W Next.js 15</p>
      </div>

      <ThemeToggle />
    </div>
  );
};

export default Header;
