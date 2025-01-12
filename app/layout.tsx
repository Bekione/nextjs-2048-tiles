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

const BASE_URL = 'https://2048-tiles.vercel.app';

export const viewport = {
  themeColor: "#262626",
};

export const metadata: Metadata = {
  title: "2048 with Next.js 15",
  description:
    "The classic 2048 game reimagined with Next.js 15 and modern components.",
  keywords: "2048, Next.js, game, game remake, animated tiles",
  metadataBase: new URL(BASE_URL),
  authors: [{ name: "Bereket Kinfe" }],
  openGraph: {
    title: "2048 with Next.js 15",
    description:
      "The classic 2048 game reimagined with Next.js 15 and modern components.",
    url: BASE_URL,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
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
    description:
      "The classic 2048 game reimagined with Next.js 15 and modern components.",
    images: `${BASE_URL}/og-image.png`,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "2048 Tiles",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "application-name": "2048 Tiles",
  },
  manifest: "/manifest.webmanifest",
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
