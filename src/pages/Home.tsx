import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Wordmark from '../components/Wordmark'

export default function Home() {
  return (
    <section className="hero">
      <h1 className="hero-title">
        <Wordmark />
      </h1>
      <p className="hero-sub">Forging software.</p>
      <Link to="/about" className="cta">
        About <ArrowRight size={16} />
      </Link>
    </section>
  )
}
