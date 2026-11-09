import type { ProjectMeta } from '../types'

// Every field a project can have. Required: name, description. The rest are
// optional: a field that is left out (or commented out) is simply not shown.
// To use one, remove the `//` in front of it and replace the example value.

export default {
  // Title of the project. Shown on the home list and as the big heading on
  // the project page.
  name: 'Pressiert',

  // The URL: hephaistos.io/projects/<slug>. Keep it fixed: the App Store
  // links to /projects/pressiert/privacy.
  slug: 'pressiert',

  // One sentence. Shown next to the name on the home list and under the
  // title block on the project page.
  description: 'Departures for Swiss public transport on iPhone, widgets and Apple Watch.',

  // Row "year" in the title block. Free text: a single year or a range.
  // year: '2026',

  // Row "status" in the title block. Free text, e.g. 'Live', 'In development',
  // 'Beta', 'Retired'.
  // status: 'Live on the App Store',

  // Row "stack" in the title block: what it is built with. Free text.
  // stack: 'SwiftUI, WidgetKit, watchOS',

  // Row "links" in the title block, each opening in a new tab. Add as many as
  // you like. (The privacy notice link is added automatically; don't list it.)
  // links: [
  //   { label: 'App Store', href: 'https://apps.apple.com/app/id0000000000' },
  //   { label: 'Source', href: 'https://github.com/hephaistos-io/pressiert' },
  // ],

  // Longer write-up, shown under the description on the project page. Write
  // it as paragraphs: <p>…</p>, one per paragraph, inside <> … </>.
  // body: (
  //   <>
  //     <p>Why it exists: the problem it solves, in two or three sentences.</p>
  //     <p>What's interesting about it: a design decision, a technical detail.</p>
  //   </>
  // ),
} satisfies ProjectMeta
