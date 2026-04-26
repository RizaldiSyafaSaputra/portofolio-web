import { ExperienceHero } from '@/components/sections/ExperiencePage/ExperienceHero'
import { ExperienceTimeline, type Experience } from '@/components/sections/ExperiencePage/ExperienceTimeline'
import { Metadata } from 'next'
import { getExperiences } from '@/lib/actions/experience'
import type { Experience as DBExperience } from '@/lib/types/database'

export const metadata: Metadata = {
  title: 'Experience | Professional Journey',
  description: 'Explore my professional experience, skills, and career growth across multiple companies and roles.',
}

/**
 * Maps database Experience rows to the component's Experience interface.
 * The component uses English field names while the DB uses Indonesian.
 */
function mapExperiences(dbExperiences: DBExperience[]): Experience[] {
  return dbExperiences.map((exp) => ({
    id: exp.id_experience,
    companyName: exp.nama_perusahaan || 'Unknown Company',
    position: exp.posisi || 'Unknown Position',
    skills: exp.keahlian
      ? exp.keahlian.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    jobType: exp.jenis_pekerjaan || 'Full-time',
    programType: exp.jenis_program || 'Permanent',
    startDate: exp.tanggal_masuk || '-',
    endDate: exp.tanggal_selesai || 'Present',
    location: exp.lokasi_perusahaan || 'Remote',
    description: exp.deskripsi || '',
    media: exp.media_url
      ? [{ type: 'image' as const, url: exp.media_url, alt: exp.nama_perusahaan || 'Experience' }]
      : [],
  }))
}

export default async function ExperiencePage() {
  let experiences: Experience[] = []

  try {
    const dbExperiences = await getExperiences()
    experiences = mapExperiences(dbExperiences)
  } catch {
    // Silently handle — ExperienceTimeline will show empty state
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <ExperienceHero />
      <ExperienceTimeline experiences={experiences} />
    </div>
  )
}