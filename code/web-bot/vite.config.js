import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 2888,
    proxy: {
      '/bot-api/': {
        target: 'http://localhost:55555',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/bot-api/, ''),
      },
    },
  },
})
