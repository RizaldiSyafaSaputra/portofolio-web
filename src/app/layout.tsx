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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased bg-slate-950 text-slate-300">
        {children}
      </body>
    </html>
  );
}
