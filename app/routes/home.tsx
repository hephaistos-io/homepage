import Wordmark from '../components/Wordmark'
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
          <Wordmark />
        </h1>
      </section>
      <section className="grid">
        {projects.map((p, i) => (
          <article key={i} className="cell">
            <span className="cell-index">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="cell-name">{p.name}</h3>
            <p className="cell-desc">{p.description}</p>
          </article>
        ))}
      </section>
    </>
  )
}
