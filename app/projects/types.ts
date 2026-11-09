import type { ReactNode } from 'react'

export type ProjectLink = { label: string; href: string }

/** What a project's `project.tsx` default-exports. Only name + description are required. */
export type ProjectMeta = {
  name: string
  /** Fixed URL slug; defaults to the folder name without its number prefix. */
  slug?: string
  /** One line; shown on the home list and as the lede on the project page. */
  description: string
  year?: string
  status?: string
  stack?: string
  links?: ProjectLink[]
  /** Longer write-up. Plain JSX, e.g. <><p>…</p><p>…</p></>. */
  body?: ReactNode
}

export type ProjectImage = { src: string; file: string }

export type Project = ProjectMeta & {
  slug: string
  folder: string
  /** True when the folder has a privacy.mdx; served at /projects/<slug>/privacy. */
  hasPrivacy: boolean
  /** fig. 1 is the quote on the home page, so projects start at 2. */
  fig: number
  images: ProjectImage[]
}
