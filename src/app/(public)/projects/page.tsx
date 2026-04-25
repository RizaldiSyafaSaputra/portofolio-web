import type { Metadata } from "next";
import { ProjectsHero } from "@/components/sections/ProjectsPage/ProjectsHero";
import { ProjectGrid } from "@/components/sections/ProjectsPage/ProjectGrid";
import type { Project } from "@/lib/types/database";

export const metadata: Metadata = {
  title: "Projects — Rizaldi Syafa Saputra",
  description: "Showcase of my latest creative projects and engineering work.",
};

const dummyProjects: Project[] = [
  {
    id_project: "1",
    id: "user-1",
    nama_project: "Nexus AI Platform",
    deskripsi: "A high-performance AI integration platform that enables developers to build and scale LLM applications with ease. Features include prompt engineering tools, analytics dashboard, and seamless API connectivity.",
    keahlian: "AI Integration, System Architecture, Performance Tuning",
    tools: "Next.js, OpenAI API, Supabase, Tailwind CSS, Framer Motion",
    media_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?fit=crop&w=1200&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_project: "2",
    id: "user-1",
    nama_project: "CryptoFlow Dashboard",
    deskripsi: "Real-time cryptocurrency tracking and portfolio management dashboard. Implements WebSocket connections for live price updates and advanced chart visualizations.",
    keahlian: "Frontend Development, Real-time Data, Data Visualization",
    tools: "React, Chart.js, Socket.io, Node.js, PostgreSQL",
    media_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?fit=crop&w=1200&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_project: "3",
    id: "user-1",
    nama_project: "EcoTrack Mobile App",
    deskripsi: "A sustainable living companion app that helps users track their carbon footprint and find eco-friendly alternatives in their local area.",
    keahlian: "Mobile Development, Geo-location, UX Research",
    tools: "React Native, Google Maps API, Firebase, Redux",
    media_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?fit=crop&w=1200&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_project: "4",
    id: "user-1",
    nama_project: "Velocity E-Commerce",
    deskripsi: "A high-speed headless e-commerce storefront focused on sub-second load times and high conversion rates. Integrated with Stripe and Sanity CMS.",
    keahlian: "Headless CMS, E-commerce, Performance Optimization",
    tools: "Next.js, Sanity.io, Stripe, Shopify API, Vercel",
    media_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1200&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_project: "5",
    id: "user-1",
    nama_project: "CyberSentinel Security Suite",
    deskripsi: "An enterprise-grade monitoring tool that detects and prevents network intrusions using machine learning algorithms and real-time packet analysis.",
    keahlian: "Cybersecurity, Machine Learning, Backend Engineering",
    tools: "Python, TensorFlow, Go, Docker, Kubernetes",
    media_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?fit=crop&w=1200&q=80",
    created_at: "",
    updated_at: ""
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <ProjectsHero />
      <ProjectGrid projects={dummyProjects} />
    </div>
  );
}
