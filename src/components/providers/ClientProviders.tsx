"use client";

import React from "react";
import { AnimationProvider } from "@/context/AnimationContext";
import SmoothScroll from "@/components/ui/SmoothScroll";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";
import AnimationToggle from "@/components/ui/AnimationToggle";
import { usePathname } from "next/navigation";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

  return (
    <AnimationProvider>
      <SmoothScroll>
        {!isAdminPage && <Navbar />}
        <main className="flex-grow">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        {!isAdminPage && <Footer />}
        <CustomCursor />
        <AnimationToggle />
      </SmoothScroll>
    </AnimationProvider>
  );
}
