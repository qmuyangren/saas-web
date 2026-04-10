import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'src/mock/modules',
        enable: mode === 'development',
      }),
    ],
    
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#1890ff',
            'border-radius-base': '6px',
          },
          javascriptEnabled: true,
        },
      },
    },
    
    server: {
      port: 3100,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
    },
  }
})
