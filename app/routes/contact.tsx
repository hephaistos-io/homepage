import type { Route } from './+types/contact'

// Deliberately unlinked: reachable only by its URL (/contact), e.g. from an
// app-store listing. noindex keeps it out of search results. It is still a
// public page, so don't put anything here that must stay private.
export const meta: Route.MetaFunction = () => [
  { title: 'Contact — hephaistos' },
  { name: 'robots', content: 'noindex' },
]

export default function Contact() {
  return (
    <article className="doc">
      <div className="prose">
        <h1>Contact</h1>
        <p>
          <a href="mailto:admin@hephaistos.io">admin@hephaistos.io</a>
        </p>
        <address className="contact-address">
          Ricardo Simoes
          <br />
          Postfach
          <br />
          8126 Zürich
          <br />
          Switzerland
        </address>
      </div>
    </article>
  )
}
