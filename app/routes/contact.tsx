import { useEffect, useState } from 'react'
import type { Route } from './+types/contact'

// The address never appears whole in the prerendered HTML: scrapers reading
// the HTML see "admin [at] hephaistos.io"; in the browser it is assembled
// after hydration into a working mailto link.
const USER = 'admin'
const DOMAIN = 'hephaistos.io'

function Email() {
  const [address, setAddress] = useState<string | null>(null)
  useEffect(() => setAddress(`${USER}@${DOMAIN}`), [])
  if (!address) return <span>{`${USER} [at] ${DOMAIN}`}</span>
  return <a href={`mailto:${address}`}>{address}</a>
}

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
          <Email />
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
