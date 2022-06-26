import {defineConfig} from 'vite'
import {minifyHtml} from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: `assets/[name].js`,
        entryFileNames: `assets/[name].js`
      }
    },
    target: 'esnext',
    terserOptions: {
      format: {
        comments: false
      }
    }
  },
  plugins: [minifyHtml(), vue()]
})