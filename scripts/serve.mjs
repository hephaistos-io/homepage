// Serves build/client the way GitHub Pages does, for `npm run preview`:
// - /path        -> /path.html or a 301 to /path/ when it is a directory
// - /path/       -> /path/index.html
// - anything missing -> 404.html with status 404 (boots the SPA fallback)
// `vite preview` does not do this: it answers sub-paths with the home page's
// HTML, which hydrates into the wrong route and renders the page twice.
import { createServer } from 'node:http'
import { createReadStream, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const root = 'build/client'
const port = Number(process.env.PORT ?? 4173)
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain',
}

const stat = (p) => { try { return statSync(p) } catch { return null } }
const send = (res, status, file) => {
  res.writeHead(status, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  const path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '')
  const file = join(root, path)
  const s = stat(file)
  if (s?.isFile()) return send(res, 200, file)
  if (s?.isDirectory()) {
    if (!path.endsWith('/')) {
      res.writeHead(301, { location: `${url.pathname}/${url.search}` })
      return res.end()
    }
    if (stat(join(file, 'index.html'))?.isFile()) return send(res, 200, join(file, 'index.html'))
  }
  if (stat(`${file}.html`)?.isFile()) return send(res, 200, `${file}.html`)
  send(res, 404, join(root, '404.html'))
}).listen(port, () => console.log(`Serving ${root} like GitHub Pages at http://localhost:${port}`))
