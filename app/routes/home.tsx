import SpecWordmark from '../components/SpecWordmark'
import type { Route } from './+types/home'

export const meta: Route.MetaFunction = () => [{ title: 'hephaistos' }]

// Placeholder content until real projects exist.
const projects = [
  { name: '[Project one]', description: '[One-line description]' },
  { name: '[Project two]', description: '[One-line description]' },
  { name: '[Project three]', description: '[One-line description]' },
]

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
          {projects.map((p, i) => (
            <li key={i}>
              <span className="mono works-fig">fig. {i + 2}</span>
              <span className="works-name">{p.name}</span>
              <span className="works-desc">{p.description}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
