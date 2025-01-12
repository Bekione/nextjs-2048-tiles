"use client";

import { useEffect } from "react";
import Header from "@/components/header";
import GameBoard from "@/components/game-board";
import InstructionCard from "@/components/instruction-card";
import { GitHubLink } from "@/components/github-link";
import Image from "next/image";
import cloudinaryLoader from "@/lib/image-loader";
import { gifNumbers } from "@/components/tile";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;

      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );

            // Send the Cloudinary base URL to the service worker
            registration.active?.postMessage({ cloudinaryBaseUrl });
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });

      // Listen for the clearLocalStorage message from the service worker
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data?.action === "clearLocalStorage") {
          localStorage.removeItem("bestScore");
          console.log("Best score cleared!");
        }
      });
    }
  }, []);

  return (
    <div className="h-screen relative flex flex-col items-center bg-muted">
      <div style={{ display: "none" }}>
        {gifNumbers.map((src) => (
          <Image
            loader={cloudinaryLoader}
            key={src}
            src={`/gifs/${src}.webp`}
            alt=""
            width={128}
            height={128}
            priority
          />
        ))}
      </div>
      <Header />
      <GameBoard />
      <InstructionCard />
      <GitHubLink />
    </div>
  );
}
