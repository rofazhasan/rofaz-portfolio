import type { Metadata } from "next";
import { JetBrains_Mono, Syne, Outfit } from "next/font/google";
import "./globals.css";
import Chatbot from "../components/Chatbot";
import ClientLayout from "./ClientLayout";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Md. Rofaz Hasan Rafiu | Portfolio",
  description: "Senior Full-Stack Engineer merging high-performance Rust backends with immersive Next.js frontends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${outfit.variable} ${jbMono.variable} antialiased selection:bg-[#00ff41]/30 font-body bg-[var(--bg)] max-w-full overflow-x-hidden transition-colors duration-300`}
      >
        <ClientLayout>
          {children}
          <Chatbot />
        </ClientLayout>
      </body>
    </html>
  );
}
