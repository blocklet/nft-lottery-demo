import { defineConfig } from 'vite';
import react from 'vite-preset-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL,
  plugins: [react({ removeDevtoolsInProd: true, injectReact: true })],
});
