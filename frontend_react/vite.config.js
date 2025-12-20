import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  server: {
    proxy: {
      '/api':'http://127.0.0.1:8080',
    },
  },
  plugins: [react()],
})


// export default defineConfig({
//   // Base path for assets when building the project
//   base: '/static/', // Adjust this according to your Django static URL
//   plugins: [react()],
  
//   build: {
//     outDir: 'dist', // The directory where Vite will output built files
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html'),
//       },
//       output: {
//         assetFileNames: (assetInfo) => {
//           let extType = assetInfo.name.split('.').pop();
//           // Place assets in the correct directory
//           if (/json/.test(extType)) {
//             return 'locales/[name].[hash].[ext]';
//           } else if (/png|jpe?g|svg|gif/.test(extType)) {
//             return 'assets/[name].[hash].[ext]';
//           } else {
//             return '[name].[hash].[ext]';
//           }
//         },
//         chunkFileNames: 'js/[name].[hash].js',
//         entryFileNames: 'js/[name].[hash].js',
//       },
//     },
//   },

//   resolve: {
//     alias: {
//       // Helps to resolve the 'src' path in your imports
//       '@': resolve(__dirname, 'src'),
//     },
//   },

//   server: {
//     port: 3000,
//     open: true, // Automatically open the app in the browser
//   },
// });
