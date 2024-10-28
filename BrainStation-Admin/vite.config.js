import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react() 
  ],
  base: "./", 
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/` 
    }
  },
  server: {
    port: 9009, 
    host: true  
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis" 
      }
    }
  }
});
