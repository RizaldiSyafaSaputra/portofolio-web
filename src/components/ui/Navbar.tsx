"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/utils/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  }, [pathname, isMobileOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      style={{
        background: isScrolled
          ? "linear-gradient(135deg, #003540 0%, #005461 40%, #018790 100%)"
          : "linear-gradient(135deg, #003540cc 0%, #005461cc 40%, #018790cc 100%)",
        backdropFilter: "blur(12px)",
        boxShadow: isScrolled
          ? "0 4px 20px rgba(0,0,0,0.3)"
          : "none",
        transitionDuration: "var(--transition-base)",
      }}
    >
      <div className="container mx-auto max-w-[1200px] px-6 flex items-center justify-between h-16">
        {/* Logo + subtitle */}
        <Link href="/" className="no-underline flex flex-col leading-tight">
          <span
            className="text-lg font-extrabold tracking-tight"
            style={{ color: "var(--accent)", textTransform: "uppercase" }}
          >
            {SITE_CONFIG.name}
          </span>
          <span
            className="text-[10px] font-medium tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {SITE_CONFIG.description}
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide transition-all"
                  style={{
                    color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                    background: isActive
                      ? "var(--accent)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 2px 12px rgba(0,183,181,0.4)"
                      : "none",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
          style={{ color: "#fff" }}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className="md:hidden animate-fade-in-down"
          style={{
            background: "linear-gradient(180deg, #003540 0%, #005461 100%)",
          }}
        >
          <ul className="flex flex-col py-3 px-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all"
                    style={{
                      color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                      background: isActive ? "var(--accent)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
