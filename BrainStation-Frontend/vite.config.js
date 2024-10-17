import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  },
  server: {
    https: {
      key: fs.readFileSync("/app/localhost.key"),
      cert: fs.readFileSync("/app/localhost.crt"),
    },
    host: '0.0.0.0',
    port: 5173
  }
});
