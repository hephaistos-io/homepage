import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('projects/:slug', 'routes/project.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
