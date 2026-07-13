import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app-api': path.resolve(__dirname, './src/api'),
            '@app-components': path.resolve(__dirname, './src/components'),
            '@app-consts': path.resolve(__dirname, './src/consts'),
            '@app-types': path.resolve(__dirname, './src/types'),
            '@app-ui': path.resolve(__dirname, './src/ui'),
            '@app-utils': path.resolve(__dirname, './src/utils'),
        }
    }
});
