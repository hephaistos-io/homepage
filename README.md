# hephaistos.io homepage

React Router (framework mode, static prerender) + lucide-react, deployed to GitHub Pages.

```bash
npm install
npm run dev        # local dev server
npm run build      # prerendered static site in build/client
npm run preview    # serve build/client
npm run typecheck
```

## Static hosting / direct links

`react-router.config.ts` sets `ssr: false` and `prerender: true`, so every
static route is written as `build/client/<path>/index.html`. A visitor opening
`/about` directly gets real HTML, not a redirect through `index.html`.

Unknown paths: `scripts/spa-404.mjs` copies the SPA fallback to `404.html`,
which GitHub Pages serves for missing files; the app boots and renders the
catch-all route.

Routes with params (e.g. `/projects/:slug`) are not prerendered automatically;
list their URLs via `prerender: async () => [...]` in `react-router.config.ts`.

Custom domain: `public/CNAME` (hephaistos.io), so the site lives at `/`.
`BASE_PATH` only needs changing if that ever moves to a sub-path.

Deploy: `.github/workflows/deploy.yml` builds on push to `main`. In repo
Settings → Pages, set Source to "GitHub Actions" and the custom domain to
hephaistos.io. DNS: `A` records for the apex to GitHub Pages' IPs
(185.199.108.153, .109.153, .110.153, .111.153), optionally `www` CNAME to
`hephaistos-io.github.io`.

## Wordmark

`app/components/Wordmark.tsx` renders the wordmark as outlined SVG (Inter
ExtraBold). The red dot is the font's own tittle of the "i", so its position is
exact at every size. It scales with `font-size` and sits on the text baseline.

To regenerate (different tracking, dot size, or font):

```bash
pip install fonttools uharfbuzz
python3 scripts/generate-wordmark.py Inter-ExtraBold.ttf --tracking -0.04 > app/components/wordmark-data.ts
```
