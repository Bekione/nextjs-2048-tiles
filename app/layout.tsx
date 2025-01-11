import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2048 with Next.js 15",
  description:
    "The famous 2048 game built with Next.js 15 and modern components.",
  keywords: "2048, Next.js, game, modern components",
  authors: [{ name: "Bereket Kinfe" }],
  openGraph: {
    title: "2048 with Next.js 15",
    description: "The famous 2048 game built with Next.js 15 and modern components.",
    url: "https://nextjs-2048-tiles.vercel.app",
    type: "website",
    images: [
      {
        url: "https://nextjs-2048-tiles.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
        alt: "2048 Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bekione23",
    title: "2048 with Next.js 15",
    description: "The famous 2048 game built with Next.js 15 and modern components.",
    images: "https://nextjs-2048-tiles.vercel.app/og-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
