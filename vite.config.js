import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        if (id.includes("lucide-react")) {
                            return "ui-icons";
                        }
                        if (id.includes("framer-motion") ||
                            id.includes("@radix-ui") ||
                            id.includes("@base-ui")) {
                            return "ui-framework";
                        }
                        if (id.includes("react-router-dom") ||
                            id.includes("react-router") ||
                            id.includes("@remix-run")) {
                            return "vendor-router";
                        }
                        return "vendor";
                    }
                },
            },
        },
    },
});
