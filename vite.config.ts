import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 4096
  },
  worker: {
    format: 'es'
  },
  base: process.env.ELECTRON === 'true' ? './' : '/',
  plugins: [
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
          next()
        })
      }
    },
    topLevelAwait(),
    viteStaticCopy({
      targets: [
        {
          src: 'static/netlify.toml', // for netlify cross origin setting
          dest: './'
        }
      ]
    })
  ]
})
