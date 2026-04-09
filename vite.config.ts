import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
     sitemap({
      hostname: 'https://lisbonguide.site',
      dynamicRoutes: [
        '/',
        '/explore',
        '/where-to-eat',
        '/around-lisbon',
        '/cascais/see',
        '/cascais/eat',
        '/sintra/see',
        '/sintra/eat',
        '/about',
        '/contact',
      ],
      exclude: ['/google1a4d2e863c003d4a'],
    }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});