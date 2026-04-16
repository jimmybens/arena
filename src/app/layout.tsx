import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Arena",
  description: "Strava du Betting - Plateforme P2P de tournois de pronostics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("dark", "font-sans", geist.variable)}>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
