# CLAUDE.md

- Static site for **GitHub Pages**: React Router framework mode with `ssr: false` + `prerender: true`. Every route is pre-rendered to HTML at build time; there is no server at runtime. Don't add anything that needs one (server loaders/actions, API routes).
- Served from the **custom domain hephaistos.io** (`public/CNAME`) at the root path, so `BASE_PATH` stays `/`.
- Deploy: `.github/workflows/deploy.yml` on push to `main`. Unknown URLs fall back to `404.html` (`scripts/spa-404.mjs`).
- Adding/updating a project: follow `.claude/skills/add-project/SKILL.md`.
- Projects: one folder per project, `app/projects/<nn>-<slug>/`, with `project.tsx` (default-exports a `ProjectMeta`, see `app/projects/types.ts`) and optional `images/`. The numeric prefix sets order and fig numbers and is stripped from the URL (`/projects/<slug>`). Images show in natural filename order (`1_…`, `2_…`, `10_…`); the first is shown first. Project pages are prerendered from the folder list in `react-router.config.ts`.
- Optional per project: `privacy.mdx` in the project folder -> `/projects/<slug>/privacy`, auto-linked in the project's "links" row. Exactly that filename; nothing to register. Start from `docs/privacy-template.mdx`. Once an outside service (app store) links to a project's pages, set `slug` in `project.tsx` so renaming the folder can't change the URL.
- `/contact` (`app/routes/contact.tsx`) is intentionally not linked anywhere and is `noindex`; keep it out of the nav.
- `npm run preview` (`scripts/serve.mjs`) serves `build/client` the way GitHub Pages does (dir → `index.html`, trailing-slash redirect, `404.html`). Don't swap it back to `vite preview`: that answers sub-paths with the home HTML, so they render twice after hydration.
- Check before pushing: `npm run typecheck && npm run build`.
