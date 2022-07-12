import {createHtmlPlugin} from 'vite-plugin-html'
import {defineConfig} from 'vite'
import svgLoader from 'vite-svg-loader'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
export default defineConfig({
  build: {
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
  plugins: [
    createHtmlPlugin({
      minify: true
    }),
    svgLoader({
      svgo: false
    }),
    Vue({
      reactivityTransform: true
    }),
    WindiCSS()
  ]
})