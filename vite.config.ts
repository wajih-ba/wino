import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

/** GitHub project pages need `base` = `/repo-name/` (set `VITE_BASE_PATH` in CI). */
function appBase(): string {
  const raw = process.env.VITE_BASE_PATH;
  if (!raw || raw === "/") return "/";
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  return withSlash.startsWith("/") ? withSlash : `/${withSlash}`;
}

export default defineConfig({
  base: appBase(),
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
