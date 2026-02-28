import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// 需要安装@types/node@18.14.2才能识别node模块

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5167',
        changeOrigin: true
      },
    },
  },
  // 配置css加载器  需要下载less@4.1.3  less-loader@11.1.0
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, 'src/styles/variable.less')}";`,
        javascriptEnabled: true
      }
    },
  },
  resolve: {
    //设置路径别名
    alias: {
      '@': resolve(__dirname, 'src'),// src 路径
      '~': resolve(__dirname, './'), // 根路径
    }
  },
  build: { // 打包设置
    manifest: true,
    rollupOptions: {
      output: {
        sourcemap: false
      }
    }
  }
})
