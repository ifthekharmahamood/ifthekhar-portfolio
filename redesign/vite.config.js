import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dependencies resolve from the parent project's node_modules (Node walks the
// directory tree upward), so this folder deliberately has no install of its own.
export default defineConfig({
  plugins: [react()],
  server: { port: 5273 },
});
