import { ExperienceHero } from '@/components/sections/ExperiencePage/ExperienceHero'
import { ExperienceTimeline, type Experience } from '@/components/sections/ExperiencePage/ExperienceTimeline'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience | Professional Journey',
  description: 'Explore my professional experience, skills, and career growth across multiple companies and roles.',
}

const experiences: Experience[] = [
  {
    id: 'exp-1',
    companyName: 'TechCorp Innovation Labs',
    position: 'Senior Full Stack Engineer',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
    jobType: 'Full-time',
    programType: 'Permanent Role',
    startDate: 'Jan 2023',
    endDate: 'Present',
    location: 'San Francisco, CA',
    description:
      'Led the development of scalable microservices architecture serving 500K+ users. Mentored 3 junior developers and established coding standards that improved code quality by 40%. Architected a real-time data processing pipeline using Apache Kafka, reducing data latency from 5 minutes to 500ms.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        alt: 'Office environment',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        alt: 'Team collaboration',
      },
    ],
  },
  {
    id: 'exp-2',
    companyName: 'StartupX Ventures',
    position: 'Full Stack Developer',
    skills: ['Next.js', 'React', 'Prisma', 'PostgreSQL', 'Vercel', 'Tailwind CSS', 'Firebase'],
    jobType: 'Full-time',
    programType: 'Startup Internship',
    startDate: 'Aug 2021',
    endDate: 'Dec 2022',
    location: 'Austin, TX',
    description:
      'Developed and deployed 3 production-ready web applications from scratch. Implemented user authentication system securing 10K+ user accounts. Built responsive UI components used across 5 different applications, improving development velocity by 30%.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=400&h=300&fit=crop',
        alt: 'Startup office',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        alt: 'Development workspace',
      },
    ],
  },
  {
    id: 'exp-3',
    companyName: 'Digital Agency Pro',
    position: 'Frontend Developer',
    skills: ['Vue.js', 'JavaScript', 'CSS', 'Webpack', 'Figma', 'SASS', 'HTML5'],
    jobType: 'Full-time',
    programType: 'Contract',
    startDate: 'Mar 2021',
    endDate: 'Jul 2021',
    location: 'New York, NY',
    description:
      'Created pixel-perfect responsive designs for 15+ client projects. Collaborated with designers to translate Figma mockups into production code. Optimized website performance, achieving 95+ Google Lighthouse scores.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
        alt: 'Design workspace',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
        alt: 'Team meeting',
      },
    ],
  },
  {
    id: 'exp-4',
    companyName: 'Code Academy',
    position: 'Web Development Bootcamp Graduate & Teaching Assistant',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'HTML', 'CSS', 'Git'],
    jobType: 'Part-time',
    programType: 'Educational Program',
    startDate: 'Oct 2020',
    endDate: 'Feb 2021',
    location: 'Remote',
    description:
      'Completed intensive 12-week full-stack development bootcamp with focus on modern JavaScript frameworks. Later served as TA, helping 20+ students debug code and understand complex concepts. Built 5 capstone projects demonstrating mastery of MERN stack.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        alt: 'Learning environment',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        alt: 'Classroom setup',
      },
    ],
  },
]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <ExperienceHero />
      <ExperienceTimeline experiences={experiences} />
  </div>
  )
}