import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Plugin to import GLSL files as raw strings
const glsl = () => {
  return {
    name: 'glsl',
    transform(code: string, id: string) {
      if (id.endsWith('.glsl')) {
        return `export default ${JSON.stringify(code)};`
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), glsl()],
  server: {
    port: 3000,
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.mp3', '**/*.wav', '**/*.ogg', '**/*.mp4'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'react', 'react-dom', '@tweenjs/tween.js', 'bezier-easing']
  }
})
