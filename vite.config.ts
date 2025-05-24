import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    viteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    // you might want to disable the `css: true` line, since we don't have
    // tests that rely on CSS -- and parsing CSS is slow.
    // I'm leaving it in here becasue often people want to parse CSS in tests.
    css: true,
  },
  esbuild: {
    loader: "tsx", // TypeScript + JSX를 처리하도록 설정
    include: /src\/.*\.[tj]sx?$/, // .ts, .tsx, .js, .jsx 파일을 모두 포함
    exclude: /node_modules/, // 제외
  },
  build: {
    minify: "terser", // terser를 사용하여 빌드된 파일을 최소화
    terserOptions: {
      compress: {
        drop_console: true, // 콘솔 로그를 제거
        drop_debugger: true, // 디버거 구문을 제거
      },
      output: {
        comments: false, // 모든 주석을 제거
      },
    },
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
