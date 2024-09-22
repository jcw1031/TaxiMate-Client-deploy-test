import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
// import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://52.78.19.118:8080',
        changeOrigin: true,
        secure: false,
      },
      '/oauth2': {
        target: 'http://52.78.19.118:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    target: 'esnext'
  }
});
