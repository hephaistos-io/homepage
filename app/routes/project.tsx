import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import type { Route } from './+types/project'
import Gallery from '../components/Gallery'
import { getProject } from '../projects'
import NotFound from './not-found'

export const meta: Route.MetaFunction = ({ params }) => {
  const project = getProject(params.slug)
  return project
    ? [{ title: `${project.name} — hephaistos` }, { name: 'description', content: project.description }]
    : [{ title: 'Not found — hephaistos' }]
}

export default function ProjectPage({ params }: Route.ComponentProps) {
  const project = getProject(params.slug)
  if (!project) return <NotFound />

  const rows = (
    [
      ['year', project.year],
      ['status', project.status],
      ['stack', project.stack],
    ] as const
  ).filter(([, value]) => value)

  return (
    <article className="project">
      <Link to="/" className="mono muted project-back">
        ← work / fig. {project.fig}
      </Link>
      <div className="project-grid">
        <div className="project-media">
          {/* key: reset the selected image when navigating between projects */}
          <Gallery key={project.slug} images={project.images} fig={project.fig} />
        </div>
        <aside className="project-aside">
          <div className="titleblock">
            <div className="titleblock-head">
              <span className="mono muted">fig. {project.fig}</span>
              <h1>{project.name}</h1>
            </div>
            {(rows.length > 0 || project.links?.length) && (
              <dl className="titleblock-rows">
                {rows.map(([label, value]) => (
                  <div key={label}>
                    <dt className="mono muted">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                {project.links?.length ? (
                  <div>
                    <dt className="mono muted">links</dt>
                    <dd className="titleblock-links">
                      {project.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                          {l.label} <ArrowUpRight size={14} />
                        </a>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            )}
          </div>
          <p className="project-lede">{project.description}</p>
          {project.body && <div className="project-body">{project.body}</div>}
        </aside>
      </div>
    </article>
  )
}
