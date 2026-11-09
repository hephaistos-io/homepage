import { naturalCompare, projectSlug } from './slug'
import type { Project, ProjectImage, ProjectMeta } from './types'

// One folder per project:
//   app/projects/<nn>-<slug>/project.tsx   default-exports a ProjectMeta
//   app/projects/<nn>-<slug>/images/*      optional; shown in filename order
//   app/projects/<nn>-<slug>/privacy.mdx   optional; /projects/<slug>/privacy
// The globs are resolved at build time, so everything ends up in the
// prerendered HTML. Image imports give hashed URLs under /assets.
const metas = import.meta.glob<ProjectMeta>('./*/project.tsx', { eager: true, import: 'default' })
// `?dims` (vite.config.ts) gives { src, width, height } per image.
const imageUrls = import.meta.glob<{ src: string; width: number; height: number }>(
  './*/images/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true, query: '?dims', import: 'default' },
)
// Only the file list is needed here; the privacy route loads the content.
// `?raw` + lazy keeps this from touching the compiled MDX modules (no chunk
// conflict with the route's eager import), and nothing here is ever called.
const privacyFiles = import.meta.glob('./*/privacy.mdx', { query: '?raw', import: 'default' })

const folderOf = (path: string) => path.split('/')[1]
const fileOf = (path: string) => path.split('/').pop()!

const imagesByFolder = new Map<string, ProjectImage[]>()
for (const path of Object.keys(imageUrls).sort((a, b) => naturalCompare(fileOf(a), fileOf(b)))) {
  const list = imagesByFolder.get(folderOf(path)) ?? []
  list.push({ ...imageUrls[path], file: fileOf(path) })
  imagesByFolder.set(folderOf(path), list)
}
const privacyFolders = new Set(Object.keys(privacyFiles).map(folderOf))

export const projects: Project[] = Object.keys(metas)
  .map(folderOf)
  .sort(naturalCompare)
  .map((folder, i) => {
    const meta = metas[`./${folder}/project.tsx`]
    return {
      ...meta,
      slug: projectSlug(folder, meta),
      folder,
      fig: i + 2,
      images: imagesByFolder.get(folder) ?? [],
      hasPrivacy: privacyFolders.has(folder),
    }
  })

const bySlug = new Map<string, Project>()
for (const p of projects) {
  if (bySlug.has(p.slug)) throw new Error(`Two project folders map to the slug "${p.slug}"`)
  bySlug.set(p.slug, p)
}

export const getProject = (slug: string | undefined) => (slug ? bySlug.get(slug) : undefined)
