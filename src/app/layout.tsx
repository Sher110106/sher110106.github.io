import type { Metadata } from "next";
import { Manrope, Recursive } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const recursive = Recursive({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sher110106.github.io"),
  title: "Sher Partap Singh | AI Researcher-Engineer",
  description:
    "AI researcher-engineer working on trustworthy AI, clinical NLP, LLM evaluation, reinforcement-learning diagnostics, and agent systems.",
  openGraph: {
    title: "Sher Partap Singh | AI Researcher-Engineer",
    description: "Research and systems in trustworthy AI, clinical NLP, LLM evaluation, reinforcement learning, and agents.",
    url: "https://sher110106.github.io",
    siteName: "Sher Partap Singh",
    images: [{ url: "/portrait.png", width: 1200, height: 1200, alt: "Sher Partap Singh" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sher Partap Singh | AI Researcher-Engineer",
    description: "Research and systems in trustworthy AI, clinical NLP, LLM evaluation, reinforcement learning, and agents.",
    images: ["/portrait.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${recursive.variable}`}>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
