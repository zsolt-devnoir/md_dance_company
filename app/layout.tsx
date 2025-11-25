import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/providers/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MD Dance Company – Creative Production in Motion",
  description:
    "Choreography, performance, and visual storytelling for brands, shows, and global events.",
  openGraph: {
    title: "MD Dance Company – Creative Production in Motion",
    description:
      "Choreography, performance, and visual storytelling for brands, shows, and global events.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${anton.variable} antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
