import type { Route } from './+types/about'

export const meta: Route.MetaFunction = () => [{ title: 'About — hephaistos' }]

export default function About() {
  return (
    <section className="page">
      <h2>About</h2>
      <p>[About text]</p>
    </section>
  )
}
