import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const rawApiUrl = env.VITE_API_URL || 'https://delexpress-backend.onrender.com/api'
  const localApiOrigin = env.VITE_LOCAL_API_ORIGIN || 'http://localhost:5002'
  let proxyTarget = 'https://delexpress-backend.onrender.com'
  let proxySecure = true

  if (rawApiUrl.startsWith('/')) {
    proxyTarget = localApiOrigin
    proxySecure = false
  } else {
    try {
      const parsed = new URL(rawApiUrl)
      proxyTarget = parsed.origin
      proxySecure = parsed.protocol === 'https:'
    } catch {
    proxyTarget = 'https://delexpress-backend.onrender.com'
      proxySecure = true
    }
  }

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: proxySecure,
        },
      },
    },
  }
})
