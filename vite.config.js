import {createHtmlPlugin} from 'vite-plugin-html'
import {defineConfig} from 'vite'
import svgLoader from 'vite-svg-loader'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'chunks/[name].js',
        entryFileNames: 'entries/[name].js'
      }
    },
    sourcemap: true,
    target: 'esnext'
  },
  esbuild: {
    legalComments: 'none'
  },
  plugins: [createHtmlPlugin({
    minify: true
  }), svgLoader({
    svgo: false
  }), Vue({
    reactivityTransform: true
  }), WindiCSS()]
})