import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: '.',
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          // Copy all HTML files from src/components to dist/partials
          src: 'src/components/**/*.html',
          dest: 'partials'
        }
      ]
    })
  ]
})
