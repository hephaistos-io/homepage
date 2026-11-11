import { Children, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Route } from './+types/cv'
import { cv } from '../cv/cv'
import type { Month } from '../cv/types'

export const meta: Route.MetaFunction = () => [
  { title: `CV — ${cv.name}` },
  { name: 'description', content: `${cv.name} · ${cv.headline} · ${cv.location}` },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month = (m: Month) => {
  const [y, mm] = m.split('-')
  return mm ? `${MONTHS[Number(mm) - 1]} ${y}` : y
}
const span = (start: Month, end: Month | null) => `${month(start)} — ${end ? month(end) : 'present'}`

// The label shares a row with the section's first entry only, so in print the
// two move to a new page together (a label is never left alone at a page end).
function Section({ label, children }: { label: string; children: ReactNode }) {
  const [first, ...rest] = Children.toArray(children)
  return (
    <section className="cv-section">
      <div className="cv-row cv-first">
        <h2 className="mono muted cv-label">{label}</h2>
        <div className="cv-body">{first}</div>
      </div>
      {rest.length > 0 && (
        <div className="cv-row">
          <span className="cv-label" aria-hidden="true" />
          <div className="cv-body">{rest}</div>
        </div>
      )}
    </section>
  )
}

function Entry({ when, title, where, aside, children }: { when: string; title: string; where?: ReactNode; aside?: ReactNode; children?: ReactNode }) {
  return (
    <article className="cv-entry">
      <span className="mono muted cv-when">{when}</span>
      <div className="cv-what">
        <div className="cv-title-row">
          <h3>{title}</h3>
          {aside}
        </div>
        {where && <span className="cv-where">{where}</span>}
        {children}
      </div>
    </article>
  )
}

const Points = ({ points }: { points: string[] }) => (
  <ul className="cv-points">
    {points.map((p) => (
      <li key={p}>{p}</li>
    ))}
  </ul>
)

export default function CvPage() {
  return (
    <article className="cv">
      <header className="cv-head">
        <div className="cv-head-text">
          <span className="mono muted">curriculum vitae · updated {month(cv.updated)}</span>
          <h1>{cv.name}</h1>
          <p className="cv-headline">{cv.headline}</p>
          <span className="mono muted">
            {cv.location}
            <span className="print-only"> · hephaistos.io/cv</span>
          </span>
        </div>
        <button type="button" className="mono cv-print" onClick={() => window.print()}>
          Print / save as PDF
        </button>
      </header>

      {cv.profile && (
        <Section label="profile">
          <p className="cv-profile">{cv.profile}</p>
        </Section>
      )}

      <Section label="experience">
        {cv.experience.map((e) => (
          <Entry key={e.role + e.start} when={span(e.start, e.end)} title={e.role} where={`${e.org} · ${e.place}`}>
            {e.points && <Points points={e.points} />}
            {e.groups?.map((g) => (
              <div key={g.title} className="cv-group">
                <h4>{g.title}</h4>
                <Points points={g.points} />
              </div>
            ))}
          </Entry>
        ))}
      </Section>

      {cv.publications.length > 0 && (
        <Section label="publications">
          {cv.publications.map((p) => (
            <Entry key={p.title} when={p.year} title={p.title} where={p.href ? <a href={p.href}>{p.venue}</a> : `Published in ${p.venue}`} />
          ))}
        </Section>
      )}

      <Section label="skills">
        <dl className="cv-pairs">
          {cv.skills.map((s) => (
            <div key={s.group}>
              <dt className="mono muted">{s.group}</dt>
              <dd>
                {s.core.map((c, i) => (
                  <span key={c}>
                    <strong>{c}</strong>
                    {i < s.core.length - 1 || s.other?.length ? ', ' : ''}
                  </span>
                ))}
                {s.other?.join(', ')}
              </dd>
            </div>
          ))}
          <div>
            <dt className="mono muted">Spoken languages</dt>
            <dd>{cv.languages.join(', ')}</dd>
          </div>
        </dl>
      </Section>

      <Section label="projects">
        {cv.projects.map((p) => (
          <Entry
            key={p.name}
            when={p.role}
            title={p.name}
            aside={
              p.link && (
                <a className="mono cv-link" href={p.link.href} target="_blank" rel="noreferrer">
                  {p.link.label} <ArrowUpRight size={12} />
                </a>
              )
            }
          >
            <p className="cv-desc">{p.description}</p>
          </Entry>
        ))}
      </Section>

      <Section label="certificates">
        {cv.certificates.map((c) => (
          <Entry key={c.name} when={month(c.date)} title={c.name} where={c.issuer} />
        ))}
      </Section>

      <Section label="education">
        {cv.education.map((e) => (
          <Entry key={e.school} when={span(e.start, e.end)} title={e.school} where={`${e.degree} · ${e.place}`}>
            {e.note && <p className="cv-desc">{e.note}</p>}
          </Entry>
        ))}
      </Section>
    </article>
  )
}
