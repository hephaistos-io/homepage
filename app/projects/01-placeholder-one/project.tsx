import type { ProjectMeta } from '../types'

export default {
  name: '[Project one]',
  description: '[One-line description]',
  year: '[Year]',
  status: '[Status]',
  stack: '[Stack]',
  links: [{ label: '[Repo]', href: 'https://github.com/hephaistos-io' }],
  body: (
    <>
      <p>[Longer write-up: what it is, why it exists, what was interesting about building it.]</p>
    </>
  ),
} satisfies ProjectMeta
