import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./", // Base public path
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias '@/' to 'src' directory
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Defining global for compatibility
      },
    },
  },
  server: {
    https: {
      key: fs.readFileSync('/app/localhost.key'),
      cert: fs.readFileSync('/app/localhost.crt'),
    },
    host: '0.0.0.0',  // Expose the server to external devices
    port: 5173,       // Default port for Vite
  },
});
