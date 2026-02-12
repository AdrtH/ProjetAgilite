import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const deeplApiKey = (env.DEEPL_API_KEY ?? '').trim()

  return {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
    server: {
      proxy: {
        '/api/deepl': {
          target: 'https://api-free.deepl.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/deepl/, '/v2'),
          configure(proxy) {
            proxy.on('proxyReq', (proxyReq) => {
              if (deeplApiKey) {
                proxyReq.setHeader('Authorization', `DeepL-Auth-Key ${deeplApiKey}`)
              }
            })
          },
        },
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
