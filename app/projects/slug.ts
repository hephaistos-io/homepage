// Shared by the app and react-router.config.ts (no Vite-only APIs here).

/** `01-my-thing` -> `my-thing`. The numeric prefix only sets the order. */
export const folderToSlug = (folder: string) => folder.replace(/^\d+[-_]/, '')

/** Natural sort, so `10_x` comes after `9_x`. */
export const naturalCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
