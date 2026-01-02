
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: true,
    outDir: 'dist',
    rollupOptions: {
      output: {
        // سازماندهی فایل‌های خروجی در پوشه‌های مشخص
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/main-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        
        // دسته‌بندی دستی چانک‌ها برای بهبود لودینگ و نظم پوشه‌ها
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('lucide')) return 'vendor-icons';
            if (id.includes('recharts')) return 'vendor-charts';
            if (id.includes('framer-motion')) return 'vendor-animation';
            return 'vendor-libs';
          }
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1].split('.')[0].toLowerCase();
            return `pages/${pageName}`;
          }
          if (id.includes('/components/')) {
            return 'ui-components';
          }
        },
      },
    },
  },
});
