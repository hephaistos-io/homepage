import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Must match `basename` in react-router.config.ts.
  base: process.env.BASE_PATH ?? '/',
  plugins: [reactRouter()],
})
