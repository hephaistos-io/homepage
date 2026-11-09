import { Link } from 'react-router'
import type { Project } from '../projects/types'

/** One row in the home-page works list; links to the project's page. */
export default function ProjectItem({ project }: { project: Project }) {
  return (
    <li>
      <Link to={`/projects/${project.slug}`} className="works-row">
        <span className="mono works-fig">fig. {project.fig}</span>
        <span className="works-name">{project.name}</span>
        <span className="works-desc">{project.description}</span>
      </Link>
    </li>
  )
}
