// GitHub Pages serves 404.html for any path without a file. Using the SPA
// fallback there means unknown URLs still boot the app, which then renders
// the matching client route (or the catch-all "not found" route).
import { copyFileSync } from 'node:fs'

copyFileSync('build/client/__spa-fallback.html', 'build/client/404.html')
console.log('Copied SPA fallback -> build/client/404.html')
