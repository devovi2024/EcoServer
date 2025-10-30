import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/api': {  // removed trailing slash
        target: 'http://localhost:8080',  // fixed http://
        changeOrigin: true,
        secure: false
      }
    }
  }
});
