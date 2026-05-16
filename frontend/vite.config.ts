import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // "/api" から始まるリクエストを対象にする
      "/api": {
        target: "http://localhost:5000", // バックエンドのURL
        changeOrigin: true, // ホストヘッダーの起点をターゲットに変更する
        // secure: false,                // SSL証明書を検証しない場合はfalse（httpの場合は不要）
      },
    },
  },
  envDir: "../", // envファイルを読み込むディレクトリをプロジェクトの「ルート」に設定する
});
