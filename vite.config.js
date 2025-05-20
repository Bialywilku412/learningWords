import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost',  // This is your local server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/xamp/htdocs/learningWords/learning-words/php/endpoints'),
      },
    },
  },
});
