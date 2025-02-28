import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      "Content-Security-Policy":
        "default-src 'self' https://e3ae-2409-40c2-129c-7a4b-816c-f953-2ff6-7383.ngrok-free.app 'unsafe-eval' 'unsafe-inline'; font-src 'self' https://e3ae-2409-40c2-129c-7a4b-816c-f953-2ff6-7383.ngrok-free.app",
    },
  },
});