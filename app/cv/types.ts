// Shape of app/cv/cv.ts. Dates are 'YYYY-MM' (or 'YYYY'); `end: null` = present.

export type Month = string

export type Experience = {
  role: string
  org: string
  place: string
  start: Month
  end: Month | null
  /** Bullet points. Use `groups` instead to split them under subheadings. */
  points?: string[]
  groups?: { title: string; points: string[] }[]
}

export type Publication = { title: string; venue: string; year: string; href?: string }

/** `core` items are shown emphasised, `other` items normally. */
export type SkillGroup = { group: string; core: string[]; other?: string[] }

export type Project = {
  name: string
  role: string
  description: string
  /** Shown as the link text, e.g. 'flagforge.dev' or 'hephaistos-io/alexandria'. */
  link?: { label: string; href: string }
}

export type Certificate = { name: string; issuer: string; date: Month }

export type Education = {
  school: string
  place: string
  degree: string
  start: Month
  end: Month
  note?: string
}

export type Cv = {
  name: string
  headline: string
  location: string
  /** Shown as "updated …" on the page and the printout. Bump it when you edit. */
  updated: Month
  /** Optional short intro shown first. */
  profile?: string
  experience: Experience[]
  publications: Publication[]
  skills: SkillGroup[]
  languages: string[]
  projects: Project[]
  certificates: Certificate[]
  education: Education[]
}
