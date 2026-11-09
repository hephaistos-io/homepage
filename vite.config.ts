import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Must match `basename` in react-router.config.ts.
  base: process.env.BASE_PATH ?? '/',
  // MDX (e.g. a project's privacy.mdx) compiles to a React component at build
  // time; it must run before the React Router plugin sees the module.
  plugins: [{ enforce: 'pre', ...mdx() }, reactRouter()],
})
