import { NavLink, Outlet } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import Wordmark from './Wordmark'

export default function Layout() {
  return (
    <div className="shell">
      <header className="header">
        <NavLink to="/" className="brand">
          <Wordmark />
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <a href="https://github.com/hephaistos-io" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">© {new Date().getFullYear()} hephaistos.io</footer>
    </div>
  )
}
