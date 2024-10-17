import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "src") + "/",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "vm.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "vm.crt")),
    },
    host: "0.0.0.0", // Allow external access
    port: 5173,
  },
});
