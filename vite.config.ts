import { readFileSync } from 'node:fs'
import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import { imageSize } from 'image-size'
import { defineConfig, type Plugin } from 'vite'

/**
 * `import img from './x.png?dims'` -> `{ src, width, height }`.
 * Dimensions are read at build time so the gallery can lay images out at
 * their real aspect ratio before they load (no layout shift).
 */
function imageDims(): Plugin {
  const SUFFIX = '?dims'
  return {
    name: 'image-dims',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!source.endsWith(SUFFIX)) return null
      const resolved = await this.resolve(source.slice(0, -SUFFIX.length), importer, { skipSelf: true })
      return resolved ? resolved.id + SUFFIX : null
    },
    load(id) {
      if (!id.endsWith(SUFFIX)) return null
      const file = id.slice(0, -SUFFIX.length)
      const { width, height } = imageSize(readFileSync(file))
      if (!width || !height) throw new Error(`Could not read image size: ${file}`)
      return `import src from ${JSON.stringify(file)}\nexport default { src, width: ${width}, height: ${height} }`
    },
  }
}

export default defineConfig({
  // Must match `basename` in react-router.config.ts.
  base: process.env.BASE_PATH ?? '/',
  // MDX (e.g. a project's privacy.mdx) compiles to a React component at build
  // time; it must run before the React Router plugin sees the module.
  plugins: [imageDims(), { enforce: 'pre', ...mdx() }, reactRouter()],
})
