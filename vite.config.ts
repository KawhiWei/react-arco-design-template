import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import { vitePluginForArco } from '@arco-plugins/vite-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginForArco()
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(__dirname, 'src/styles/variable.less')}";`,
        // 支持内联 JavaScript
        javascriptEnabled: true
      }
    }
  }
})
