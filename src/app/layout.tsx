import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sher Partap Singh — CS & AI Portfolio",
  description:
    "AI researcher-engineer building intelligent systems for real-world impact. Healthcare AI, Multi-Agent Systems, Longitudinal Intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
