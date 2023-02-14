import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 4096,
  },
  //server: {
  //  hmr: false
  //}, 
  worker: {
    format: 'es'
  },
  base: process.env.ELECTRON === 'true' ? './' : './',
})
