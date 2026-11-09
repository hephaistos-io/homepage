import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="page">
      <h2>404</h2>
      <p>Nothing here. <Link to="/">Back home</Link>.</p>
    </section>
  )
}
