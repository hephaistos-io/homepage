import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import type { Route } from './+types/about'

// /about was replaced by /cv. GitHub Pages can't send real redirects, so this
// prerendered page redirects with a meta refresh (no JS needed) and, once the
// app is running, a client-side replace.
export const meta: Route.MetaFunction = () => [
  { title: 'CV — hephaistos' },
  { httpEquiv: 'refresh', content: '0; url=/cv' },
  { name: 'robots', content: 'noindex' },
]

export default function About() {
  const navigate = useNavigate()
  useEffect(() => {
    void navigate('/cv', { replace: true })
  }, [navigate])
  return (
    <section className="page">
      <p>
        Moved to <Link to="/cv">/cv</Link>.
      </p>
    </section>
  )
}
