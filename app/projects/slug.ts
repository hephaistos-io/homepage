// Shared by the app and react-router.config.ts (no Vite-only APIs here).

/**
 * URL slug for a project folder: the `slug` field from project.tsx if set,
 * else the folder name minus its numeric prefix (`01-my-thing` -> `my-thing`).
 * Set `slug` once outside services (app stores, etc.) link to the project's
 * pages, so renaming the folder can't break those URLs.
 */
export const projectSlug = (folder: string, meta: { slug?: string }) =>
  meta.slug ?? folder.replace(/^\d+[-_]/, '')

/** Natural sort, so `10_x` comes after `9_x`. */
export const naturalCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
