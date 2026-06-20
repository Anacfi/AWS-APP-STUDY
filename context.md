App de estudio para certificaciones de AWS

Aplicacion la cual se va a construir con PWA
Una PWA es básicamente una web app con un archivo de configuración especial que le dice al iPhone "instálame como app". Nada más. No hay App Store, no hay Xcode obligatorio.

- que necesito:
Herramientas (todo gratuito):

Node.js — para correr el proyecto localmente → nodejs.org
VS Code — editor de código → code.visualstudio.com
Git — para versionar y subir a GitHub → git-scm.com
Una cuenta en GitHub — para hospedar la app gratis con GitHub Pages (Anacfi: mi cuenta)
Eso es todo. No necesitas Mac especial, no necesitas pagar nada.


La estructura mínima de una PWA
Son 3 archivos clave además del código:

mi-app-aws/
├── public/
│   ├── manifest.json       ← le dice al iPhone cómo instalarla
│   ├── sw.js               ← service worker (para offline)
│   └── icon-192.png        ← ícono de la app
├── src/
│   └── ... (tu código React)
└── package.json

----

manifest.json — el archivo más importante para iOS:

{
  "name": "AWS Study",
  "short_name": "AWS Study",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f1117",
  "theme_color": "#FF9900",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}

----
El flujo completo en 4 pasos
1. Crear la app con Vite (React)
        ↓
2. Agregarle el manifest.json y service worker
        ↓
3. Subirla a GitHub → activar GitHub Pages (URL pública gratis)
        ↓
4. En el iPhone: Safari → "Agregar a pantalla de inicio" ✓

-----
Paso 1 — Crear el proyecto
npm create...
npm install
npm run dev

Eso te da una app React corriendo en localhost:5173.

Paso 2 — Hacerla PWA
La forma más fácil es con el plugin vite-plugin-pwa:
bash

npm install -D vite-plugin-pwa

En vite.config.js:

import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      manifest: {
        name: 'AWS Study',
        short_name: 'AWS Study',
        theme_color: '#FF9900',
        display: 'standalone',
      }
    })
  ]
}

Paso 3 — Hospedar en GitHub Pages
bashnpm install -D gh-pages
En package.json agregar:
json"scripts": {
  "deploy": "gh-pages -d dist"
}
Luego:
bashnpm run build
npm run deploy
Tu app queda en https://tu-usuario.github.io/aws-study/ — esa URL la abres en Safari del iPhone y la instalas.