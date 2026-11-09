# CLAUDE.md

- Static site for **GitHub Pages**: React Router framework mode with `ssr: false` + `prerender: true`. Every route is pre-rendered to HTML at build time; there is no server at runtime. Don't add anything that needs one (server loaders/actions, API routes).
- Served from the **custom domain hephaistos.io** (`public/CNAME`) at the root path, so `BASE_PATH` stays `/`.
- Deploy: `.github/workflows/deploy.yml` on push to `main`. Unknown URLs fall back to `404.html` (`scripts/spa-404.mjs`).
- Projects: one folder per project, `app/projects/<nn>-<slug>/`, with `project.tsx` (default-exports a `ProjectMeta`, see `app/projects/types.ts`) and optional `images/`. The numeric prefix sets order and fig numbers and is stripped from the URL (`/projects/<slug>`). Images show in natural filename order (`1_…`, `2_…`, `10_…`); the first is shown first. Project pages are prerendered from the folder list in `react-router.config.ts`.
- Check pages in a browser with a plain static server (`python3 -m http.server -d build/client`), not `npm run preview`: vite preview serves the home HTML for sub-paths, which makes them render twice after hydration.
- Check before pushing: `npm run typecheck && npm run build`.
