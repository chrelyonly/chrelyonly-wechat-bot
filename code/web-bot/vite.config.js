import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
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
        // target: 'http://localhost:55555',
        target: 'https://apply.chrelyonly.cn',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/bot-api/, ''),
      },
    },
  },

  build: {
    minify: 'terser', // 使用 terser 压缩
    rollupOptions: {
      output: {
        // chunkFileNames: 'static/js/[name]-[hash].js',
        // entryFileNames: 'static/js/[name]-[hash].js',
        // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[2].split('/')[0].toString();
          }
        },
      },
    },
    terserOptions: {
      compress: {
        // 开启压缩
        drop_console: true, // 移除console
        drop_debugger: true, // 移除debugger
      },
      sourceMap: false,
      mangle: {
        // 开启变量名混淆
        toplevel: true,
      },
    },
  },
})
