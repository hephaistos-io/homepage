import { Link } from 'react-router'
import type { Route } from './+types/not-found'

export const meta: Route.MetaFunction = () => [{ title: 'Not found — hephaistos' }]

export default function NotFound() {
  return (
    <section className="page">
      <h2>404</h2>
      <p>
        Nothing here. <Link to="/">Back home</Link>.
      </p>
    </section>
  )
}
