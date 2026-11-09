import SpecWordmark from '../components/SpecWordmark'
import ProjectItem from '../components/ProjectItem'
import { projects } from '../projects'
import type { Route } from './+types/home'

export const meta: Route.MetaFunction = () => [{ title: 'hephaistos' }]

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1 className="hero-title">
          <SpecWordmark />
        </h1>
      </section>
      <section className="works">
        <div className="works-intro">
          <figure className="quote">
            <span className="mono">fig. 1</span>
            <blockquote>“…your own flower, flashing fire, source of all arts…”</blockquote>
            <figcaption className="mono muted">Aeschylus, Prometheus Bound 7 — said to Hephaistos (tr. H. W. Smyth)</figcaption>
          </figure>
          <p className="motto">Building whatever the spark leads me to.</p>
        </div>
        <ol className="works-list">
          {projects.map((p) => (
            <ProjectItem key={p.slug} project={p} />
          ))}
        </ol>
      </section>
    </>
  )
}
