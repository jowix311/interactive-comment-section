import MillionLint from "@million/lint";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
const plugins = [react(), svgr()];
plugins.unshift(MillionLint.vite());
export default defineConfig({
  plugins: plugins,
});
