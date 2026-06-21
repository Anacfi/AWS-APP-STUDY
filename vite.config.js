import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/AWS-APP-STUDY/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'AWS Study',
        short_name: 'AWS Study',
        description: 'App de estudio para certificaciones de AWS',
        start_url: '/AWS-APP-STUDY/',
        scope: '/AWS-APP-STUDY/',
        display: 'standalone',
        background_color: '#17130d',
        theme_color: '#17130d',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
