"use client";

import { useEffect } from "react";
import Header from "@/components/header";
import GameBoard from "@/components/game-board";
import InstractionCard from "@/components/instruction-card";
import { GitHubLink } from "@/components/github-link";
export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(
          (registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
          },
          (error) => {
            console.error("Service Worker registration failed:", error);
          }
        );
      });
    }
  }, []);

  return (
    <div className="h-screen relative flex flex-col items-center bg-muted">
      <Header />
      <GameBoard />
      <InstractionCard />
      <GitHubLink />
    </div>
  );
}
