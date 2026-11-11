import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Route } from './+types/cv'
import { cv } from '../cv/cv'
import type { Experience, Month } from '../cv/types'

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
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

/** Consecutive roles at the same organisation form one group (one dimension chain). */
function byOrg(roles: Experience[]) {
  const groups: { org: string; place: string; roles: Experience[] }[] = []
  for (const r of roles) {
    const last = groups[groups.length - 1]
    if (last && last.org === r.org) last.roles.push(r)
    else groups.push({ org: r.org, place: r.place, roles: [r] })
  }
  return groups
}

/** A section: a full-width rule with the label set on it, count on the right. */
function Section({ label, count, children }: { label: string; count?: string; children: ReactNode }) {
  return (
    <section className="cv-section">
      <header className="cv-sec-head mono">
        <h2>{label}</h2>
        {count && <span className="muted">{count}</span>}
      </header>
      {children}
    </section>
  )
}

const Points = ({ points }: { points: string[] }) => (
  <ul className="cv-points">
    {points.map((p) => (
      <li key={p}>{p}</li>
    ))}
  </ul>
)

/** A thin-framed box, like a field in a drawing's title block. */
function Box({ tag, title, aside, children }: { tag: string; title: string; aside?: ReactNode; children?: ReactNode }) {
  return (
    <article className="cv-box">
      <div className="cv-box-top mono muted">
        <span>{tag}</span>
        {aside}
      </div>
      {title && <h3>{title}</h3>}
      {children}
    </article>
  )
}

export default function CvPage() {
  const orgs = byOrg(cv.experience)
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

      <Section label="experience" count={plural(cv.experience.length, 'role')}>
        {orgs.map((g) => {
          const first = g.roles[g.roles.length - 1]
          const latest = g.roles[0]
          return (
            <div key={g.org + first.start} className="cv-org">
              <div className="cv-org-rail">
                <h3>{g.org}</h3>
                <span className="muted">{g.place}</span>
                <span className="mono muted">{span(first.start, latest.end)}</span>
              </div>
              <div className="cv-chain">
                {g.roles.map((r) => (
                  <div key={r.role + r.start} className="cv-role">
                    <span className="mono muted cv-role-when">{span(r.start, r.end)}</span>
                    <h4>{r.role}</h4>
                    {r.points && <Points points={r.points} />}
                    {r.groups?.map((grp) => (
                      <div key={grp.title} className="cv-group">
                        <h5>{grp.title}</h5>
                        <Points points={grp.points} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </Section>

      {cv.publications.length > 0 && (
        <Section label="publications">
          <div className="cv-grid cv-grid-1">
            {cv.publications.map((p) => (
              <Box key={p.title} tag={p.year} title={p.title}>
                <p className="cv-desc">
                  Published in{' '}
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer">
                      {p.venue} <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    p.venue
                  )}
                </p>
              </Box>
            ))}
          </div>
        </Section>
      )}

      <Section label="skills">
        <div className="cv-grid cv-grid-skills">
          {cv.skills.map((s) => (
            <Box key={s.group} tag={s.group.toLowerCase()} title="">
              <p className="cv-desc">
                {s.core.map((c, i) => (
                  <span key={c}>
                    <strong>{c}</strong>
                    {i < s.core.length - 1 || s.other?.length ? ', ' : ''}
                  </span>
                ))}
                {s.other?.join(', ')}
              </p>
            </Box>
          ))}
          <Box tag="spoken languages" title="">
            <p className="cv-desc">{cv.languages.join(', ')}</p>
          </Box>
        </div>
      </Section>

      <Section label="projects" count={plural(cv.projects.length, 'project')}>
        <div className="cv-grid">
          {cv.projects.map((p) => (
            <Box
              key={p.name}
              tag={p.role}
              title={p.name}
              aside={
                p.link && (
                  <a className="cv-link" href={p.link.href} target="_blank" rel="noreferrer">
                    {p.link.label} <ArrowUpRight size={12} />
                  </a>
                )
              }
            >
              <p className="cv-desc">{p.description}</p>
            </Box>
          ))}
        </div>
      </Section>

      <Section label="certificates" count={plural(cv.certificates.length, 'certificate')}>
        <div className="cv-grid">
          {cv.certificates.map((c) => (
            <Box key={c.name} tag={month(c.date)} title={c.name}>
              <p className="cv-desc muted">{c.issuer}</p>
            </Box>
          ))}
        </div>
      </Section>

      <Section label="education">
        <div className="cv-grid">
          {cv.education.map((e) => (
            <Box key={e.school} tag={span(e.start, e.end)} title={e.school} aside={<span>{e.place}</span>}>
              <p className="cv-desc">{e.degree}</p>
              {e.note && <p className="cv-desc muted">{e.note}</p>}
            </Box>
          ))}
        </div>
      </Section>
    </article>
  )
}
