import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 就是使用这个插件实现的文件压缩
    compression({
      threshold:2000, // 设置只有超过 2k 的文件才执行压缩
      deleteOriginalAssets:true, // 设置是否删除原文件
      skipIfLargerOrEqual:true, // 如果压缩后的文件大小与原文件大小一致或者更大时，不进行压缩
      // 其他的属性暂不需要配置，使用默认即可
    })
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
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
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
      mangle: {
        // 开启变量名混淆
        toplevel: true,
      },
    },
  },
})
