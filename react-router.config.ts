import type { Config } from '@react-router/dev/config'

/**
 * Static build for GitHub Pages:
 * - ssr: false  -> no server at runtime
 * - prerender   -> every static route is emitted as its own `<path>/index.html`,
 *                  so direct links (e.g. /about) are served real HTML by Pages.
 * Unknown paths fall back to 404.html (see scripts in package.json), which
 * boots the app and renders the catch-all route client-side.
 */
export default {
  ssr: false,
  prerender: true,
  basename: process.env.BASE_PATH ?? '/',
} satisfies Config
