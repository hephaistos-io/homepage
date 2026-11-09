---
name: add-project
description: Add or update a project on hephaistos.io — its page, images, and optional privacy notice. Use when the user wants a new project listed, project details or images changed, or a privacy notice added.
---

# Add a project

Everything lives in one folder: `app/projects/<nn>-<slug>/`. Nothing else is registered by hand; the home list, the page and prerendering pick the folder up.

```
app/projects/02-my-app/
  project.tsx     required
  images/         optional
  privacy.mdx     optional
```

## 1. Folder name

- `<nn>` sets the order on the home page and the fig number (first project = fig. 2). Renumber folders to reorder.
- The rest is the URL: `/projects/my-app`.

## 2. `project.tsx`

```tsx
import type { ProjectMeta } from '../types'

export default {
  name: 'My App',
  slug: 'my-app', // set it if anything outside the site links here (App Store)
  description: 'One line, shown on the home list and the project page.',
  year: '2026',          // optional
  status: 'Live',        // optional
  stack: 'Swift',        // optional
  links: [{ label: 'App Store', href: 'https://apps.apple.com/…' }], // optional
  body: <><p>Optional longer write-up.</p></>,                       // optional
} satisfies ProjectMeta
```

Leave out what you don't have; empty fields are not shown. Only `name` and `description` are required.

## 3. Images (`images/`)

- Order = filename, natural sort: `1_overview.png`, `2_widgets.png`, … `10_…` comes after `9_…`.
- The first image is shown first in the 16:9 stage; thumbnails below switch it.
- The stage shows the whole image (letterboxed, never cropped); thumbnails are square crops.
- Prepare images at 16:9, about 2400×1350, as WebP or JPEG (PNG only for flat graphics). They ship as-is: nothing resizes them.
- Phone screenshots: compose 2–3 screens side by side on a 16:9 canvas. A single portrait screenshot shows small in the 16:9 stage.
- No `images/` folder: the page shows only the title block.

## 4. Privacy notice (`privacy.mdx`)

- Copy `docs/privacy-template.mdx` to `<folder>/privacy.mdx` (exactly that name), fill it in, delete the comment blocks.
- It appears at `/projects/<slug>/privacy` and is linked in the project's "links" row.
- Link to `/contact` instead of writing an email address.

## 5. Check and ship

```bash
npm run typecheck && npm run build
npm run preview   # http://localhost:4173, behaves like GitHub Pages
```

Deploy = push to `main`; `.github/workflows/deploy.yml` builds and publishes.
