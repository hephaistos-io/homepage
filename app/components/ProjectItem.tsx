import { ArrowUpRight } from 'lucide-react'

export type Project = {
  name: string
  description: string
  /** Optional link; opens in a new tab. */
  href?: string
}

/** Template for one row in the works list. `fig` is assigned by position. */
export default function ProjectItem({ fig, project }: { fig: number; project: Project }) {
  const { name, description, href } = project
  return (
    <li>
      <span className="mono works-fig">fig. {fig}</span>
      <span className="works-name">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer">
            {name} <ArrowUpRight size={16} />
          </a>
        ) : (
          name
        )}
      </span>
      <span className="works-desc">{description}</span>
    </li>
  )
}
