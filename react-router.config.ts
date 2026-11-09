import { existsSync, readdirSync } from 'node:fs'
import type { Config } from '@react-router/dev/config'
import type { ProjectMeta } from './app/projects/types'
import { projectSlug } from './app/projects/slug'

// Every folder in app/projects with a project.tsx gets /projects/<slug>, plus
// /projects/<slug>/privacy when it has a privacy.mdx. project.tsx is imported
// (not just listed) so a fixed `slug` field is honoured.
const projectPaths = async () => {
  const folders = readdirSync('app/projects', { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(`app/projects/${d.name}/project.tsx`))
    .map((d) => d.name)
  const paths: string[] = []
  for (const folder of folders) {
    const meta: ProjectMeta = (await import(`./app/projects/${folder}/project.tsx`)).default
    const base = `/projects/${projectSlug(folder, meta)}`
    paths.push(base)
    if (existsSync(`app/projects/${folder}/privacy.mdx`)) paths.push(`${base}/privacy`)
  }
  return paths
}

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
  prerender: async ({ getStaticPaths }) => [...getStaticPaths(), ...(await projectPaths())],
  basename: process.env.BASE_PATH ?? '/',
} satisfies Config
