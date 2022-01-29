import { defineConfig } from 'vite';
import react from 'vite-preset-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL,
  plugins: [react({ removeDevtoolsInProd: true, injectReact: true })],
  server: {
    hmr: {
      port: 443,
    },
    port: process.env.PORT || process.env.BLOCKLET_PORT,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:3030',
    },
  },
});
