import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { rm } from 'node:fs/promises'
import path from 'node:path'

// The raw reference sheets in public/images/references are source material for
// scripts/prepare-images.mjs only. Keep them out of the production bundle.
const dropReferenceImages = () => ({
  name: 'drop-reference-images',
  apply: 'build',
  async closeBundle() {
    await rm(path.resolve('dist/images/references'), { recursive: true, force: true })
  },
})

export default defineConfig({
  base: '/abyssal-king-manga/',
  plugins: [react(), tailwindcss(), dropReferenceImages()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,
  },
})
