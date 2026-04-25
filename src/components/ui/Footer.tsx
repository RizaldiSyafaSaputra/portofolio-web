import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/utils/constants";
import { Heart, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 text-slate-400 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-white mb-4 block inline-flex items-center"
            >
              RSP<span className="text-cyan-400">.</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {SITE_CONFIG.description}. Building modern, scalable, and responsive web applications with a focus on user experience.
            </p>
            {/* Social Media Icons using images from public/ */}
            <div className="flex items-center gap-4">
              {SITE_CONFIG.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300"
                  title={social.name}
                >
                  <Image 
                    src={`/${social.icon}`} 
                    alt={social.name} 
                    width={20} 
                    height={20}
                    className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-cyan-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-cyan-500 rounded-full" />
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Address</p>
                  <p className="text-sm text-slate-500">{SITE_CONFIG.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Phone</p>
                  <p className="text-sm text-slate-500">{SITE_CONFIG.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Email</p>
                  <p className="text-sm text-slate-500">{SITE_CONFIG.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> using Next.js
          </div>
        </div>
      </div>
    </footer>
  );
}
