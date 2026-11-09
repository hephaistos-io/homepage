# CLAUDE.md

- Static site for **GitHub Pages**: React Router framework mode with `ssr: false` + `prerender: true`. Every route is pre-rendered to HTML at build time; there is no server at runtime. Don't add anything that needs one (server loaders/actions, API routes).
- Served from the **custom domain hephaistos.io** (`public/CNAME`) at the root path, so `BASE_PATH` stays `/`.
- Deploy: `.github/workflows/deploy.yml` on push to `main`. Unknown URLs fall back to `404.html` (`scripts/spa-404.mjs`).
- Home-page projects: one file per project in `app/projects/` (e.g. `04-foo.ts`, default-exporting a `Project`). They are collected automatically and rendered with `app/components/ProjectItem.tsx`; filename order sets the order and the fig numbers.
- Check before pushing: `npm run typecheck && npm run build`.
