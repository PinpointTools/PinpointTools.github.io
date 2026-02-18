import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  
  publicDir: 'assets', // Only assets folder is directly copied
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/routes', // Source directory for HTML fragments
          dest: 'src' // Destination relative to outDir (dist/src)
        }
      ]
    })
  ]
});
