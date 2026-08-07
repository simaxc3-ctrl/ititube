import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base so the build works from any subpath
  // (e.g. https://username.github.io/repo-name/) with no extra config.
  base: "./",
  plugins: [react()],
  server: {
    host: true,
  },
});
