import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "2048 Tiles",
    short_name: "2048",
    description:
      "The classic 2048 game reimagined with Next.js 15 and modern components.",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    theme_color: "#41a1a4",
    background_color: "#262626",
    display: "standalone",
    start_url: "/",
    screenshots: [
      {
        src: "/screenshot1.png",
        sizes: "1280x626",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshot2.png",
        sizes: "430x547",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
