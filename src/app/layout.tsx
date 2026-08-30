import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vesyorsins — Creative Technologist & AI Engineer",
  description: "High-performance technical portfolio featuring 3D WebGL physics, kinetic typography, and distributed systems architecture.",
  keywords: ["Creative Developer", "WebGL", "Three.js", "AI Engineer", "Next.js", "Full-Stack", "Portfolio"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#050508] text-[#f4f4f7] font-sans antialiased overflow-x-hidden relative">
        <div className="noise-bg pointer-events-none" />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
