import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            '/nekosapi': {
                target: 'https://api.nekosapi.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/nekosapi/, ''),
            },
        },
    },
    preview: {
        proxy: {
            '/nekosapi': {
                target: 'https://api.nekosapi.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/nekosapi/, ''),
            },
        },
    },
});
