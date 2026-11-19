import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Version shown in the page footer: the build date as ddmmyyyy (Argentina time),
// so every new build shows which version is published
const appVersion = new Intl.DateTimeFormat("es-AR", {
  timeZone: "America/Argentina/Buenos_Aires",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})
  .format(new Date())
  .replace(/\D/g, "");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
