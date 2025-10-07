import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      react({
        jsxImportSource: undefined,
        babel: {
          plugins: [],
        },
      }),
      tsconfigPaths(),
      isProduction && visualizer({
        filename: 'dist/bundle-analysis.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      })
    ].filter(Boolean),
    
    base: '/',
    
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      cors: true,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        }
      }
    },
    
    preview: {
      port: 5173,
      host: true,
    },
    
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: isProduction ? 'esbuild' : false,
      cssMinify: isProduction,
      target: 'es2020',
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      
      rollupOptions: {
        input: './index.html',
        output: {
          manualChunks: undefined,
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
        treeshake: false,
      },
      
      chunkSizeWarningLimit: 800,
      reportCompressedSize: false,
      emptyOutDir: true,
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'sonner'
      ],
      exclude: ['@prisma/client', '@emotion/react', '@emotion/styled'],
      force: false,
    },
    
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __SUPPORTED_LANGUAGES__: JSON.stringify(['zh-CN', 'en-US', 'ja-JP', 'ko-KR', 'de-DE', 'fr-FR']),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variables.scss";',
        },
      },
    },
    
    esbuild: {
      pure: isProduction ? ['console.log'] : [],
      legalComments: 'none',
    },
    
    resolve: {
      alias: {
        '@': '/src',
        '@/components': '/src/components',
        '@/pages': '/src/pages',
        '@/utils': '/src/utils',
        '@/hooks': '/src/hooks',
        '@/contexts': '/src/contexts',
      },
    },
    
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  };
});