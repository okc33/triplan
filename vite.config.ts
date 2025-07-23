import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// 🔽 ここをあなたのリポジトリ名に変更してください
const basePath = '/wander-planner-dash/';

export default defineConfig(({ mode }) => ({
  base: basePath, // ← ここに追加！（return オブジェクトの中）
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
