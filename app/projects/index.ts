import { folderToSlug, naturalCompare } from './slug'
import type { Project, ProjectImage, ProjectMeta } from './types'

// One folder per project:
//   app/projects/<nn>-<slug>/project.tsx   default-exports a ProjectMeta
//   app/projects/<nn>-<slug>/images/*      optional; shown in filename order
// Both globs are eager, so everything is resolved at build time and ends up
// in the prerendered HTML. Image imports give hashed URLs under /assets.
const metas = import.meta.glob<ProjectMeta>('./*/project.tsx', { eager: true, import: 'default' })
const imageUrls = import.meta.glob<string>('./*/images/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
})

const folderOf = (path: string) => path.split('/')[1]
const fileOf = (path: string) => path.split('/').pop()!

const imagesByFolder = new Map<string, ProjectImage[]>()
for (const path of Object.keys(imageUrls).sort((a, b) => naturalCompare(fileOf(a), fileOf(b)))) {
  const list = imagesByFolder.get(folderOf(path)) ?? []
  list.push({ src: imageUrls[path], file: fileOf(path) })
  imagesByFolder.set(folderOf(path), list)
}

export const projects: Project[] = Object.keys(metas)
  .map(folderOf)
  .sort(naturalCompare)
  .map((folder, i) => ({
    ...metas[`./${folder}/project.tsx`],
    slug: folderToSlug(folder),
    fig: i + 2,
    images: imagesByFolder.get(folder) ?? [],
  }))

const bySlug = new Map<string, Project>()
for (const p of projects) {
  if (bySlug.has(p.slug)) throw new Error(`Two project folders map to the slug "${p.slug}"`)
  bySlug.set(p.slug, p)
}

export const getProject = (slug: string | undefined) => (slug ? bySlug.get(slug) : undefined)
