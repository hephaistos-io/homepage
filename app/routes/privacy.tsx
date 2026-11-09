import type { ComponentType } from 'react'
import { Link } from 'react-router'
import type { Route } from './+types/privacy'
import { getProject } from '../projects'
import NotFound from './not-found'

// Eager here (not in the projects index) so privacy text only ships with this route.
const notices = import.meta.glob<ComponentType>('../projects/*/privacy.mdx', { eager: true, import: 'default' })

export const meta: Route.MetaFunction = ({ params }) => {
  const project = getProject(params.slug)
  return [{ title: project?.hasPrivacy ? `Privacy notice — ${project.name}` : 'Not found — hephaistos' }]
}

export default function PrivacyPage({ params }: Route.ComponentProps) {
  const project = getProject(params.slug)
  const Notice = project && notices[`../projects/${project.folder}/privacy.mdx`]
  if (!project || !Notice) return <NotFound />

  return (
    <article className="doc">
      <Link to={`/projects/${project.slug}`} className="mono muted doc-back">
        ← fig. {project.fig} / {project.name}
      </Link>
      <span className="mono muted">fig. {project.fig} — privacy notice</span>
      <div className="prose">
        <Notice />
      </div>
    </article>
  )
}
