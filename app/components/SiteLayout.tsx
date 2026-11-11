import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import Wordmark from './Wordmark'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <header className="header">
        <NavLink to="/" className="brand" aria-label="Home">
          <Wordmark dotScale={1.2} />
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Work</NavLink>
          <NavLink to="/cv">CV</NavLink>
          <a href="https://github.com/hephaistos-io" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer mono">
        <span>hephaistos.io</span>
        <span>sheet 1 of 1</span>
      </footer>
    </div>
  )
}
