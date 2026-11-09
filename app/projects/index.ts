import type { Project } from '../components/ProjectItem'

// Every `app/projects/*.ts` file (except this one) that default-exports a
// Project becomes a row on the home page. Order = filename sort, so prefix
// files with a number (`01-foo.ts`, `02-bar.ts`). The glob is eager, so it is
// resolved at build time and the list is in the prerendered HTML.
const modules = import.meta.glob<{ default: Project }>(['./*.ts', '!./index.ts'], { eager: true })

export const projects: Project[] = Object.keys(modules)
  .sort()
  .map((path) => modules[path].default)
