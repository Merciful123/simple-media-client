import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:6060', // Change this to your Express.js server URL
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})


 