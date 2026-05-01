// Navigation links
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Sertifikasi", href: "/sertifikasi" },
  { label: "Pengalaman", href: "/pengalaman" },
  { label: "Profiles", href: "/profiles" },
] as const;

// Site metadata
export const SITE_CONFIG = {
  name: "Rizaldi.PortofV1",
  title: "Full-Stack Developer & Tech Enthusiast",
  description: "Portfolio website Rizaldi Syafa Saputra - Fresh graduate passionate about building modern web applications with Next.js and Supabase.",
  url: "https://rizaldisyafa.com",
  author: "Rizaldi Syafa Saputra",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Full-Stack Developer", "Indonesia", "Portfolio"],
  twitterHandle: "@rizaldisyafa",
  contact: {
    email: "rizaldi.saputra52@gmail.com",
    phone: "+62 813-4575-8635",
    address: "Makassar, Indonesia",
  },
  socials: [
    { name: "GitHub", url: "https://github.com/rizaldisyafa", icon: "github.png" },
    { name: "LinkedIn", url: "https://linkedin.com/in/rizaldisyafa", icon: "linkedin.png" },
    { name: "Instagram", url: "https://instagram.com/rizaldisyafa", icon: "instagram.png" },
  ]
} as const;