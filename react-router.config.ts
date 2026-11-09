import { existsSync, readdirSync } from 'node:fs'
import type { Config } from '@react-router/dev/config'
import { folderToSlug } from './app/projects/slug'

// Every folder in app/projects with a project.tsx gets a /projects/<slug> page.
const projectPaths = readdirSync('app/projects', { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(`app/projects/${d.name}/project.tsx`))
  .map((d) => `/projects/${folderToSlug(d.name)}`)

/**
 * Static build for GitHub Pages:
 * - ssr: false  -> no server at runtime
 * - prerender   -> every static route, plus each project page, is emitted as
 *                  its own `<path>/index.html`, so direct links are real HTML.
 * Unknown paths fall back to 404.html (see scripts in package.json), which
 * boots the app and renders the catch-all route client-side.
 */
export default {
  ssr: false,
  prerender: ({ getStaticPaths }) => [...getStaticPaths(), ...projectPaths],
  basename: process.env.BASE_PATH ?? '/',
} satisfies Config
