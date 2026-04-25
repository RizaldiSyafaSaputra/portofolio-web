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
  name: "Rizaldi Syafa Saputra",
  title: "Portfolio",
  description: "Portfolio website Rizaldi Syafa Saputra",
  contact: {
    email: "hello@rizaldisyafa.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Sudirman No. 123, Jakarta Selatan, Indonesia",
  },
  socials: [
    { name: "GitHub", url: "https://github.com", icon: "github.png" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin.png" },
    { name: "Instagram", url: "https://instagram.com", icon: "instagram.png" },
  ]
} as const;