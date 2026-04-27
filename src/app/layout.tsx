import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio — Rizaldi Syafa Saputra",
  description:
    "Portfolio website Rizaldi Syafa Saputra. Menampilkan project, sertifikasi, pengalaman, dan profil.",
  keywords: ["portfolio", "developer", "web developer", "rizaldi"],
};

import { ClientProviders } from "@/components/providers/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col antialiased bg-slate-950 text-slate-300 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
