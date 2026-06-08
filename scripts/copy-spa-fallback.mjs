import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const index = join(dist, "index.html");
const fallback = join(dist, "404.html");

if (!existsSync(index)) {
  console.error("copy-spa-fallback: dist/index.html missing — run vite build first.");
  process.exit(1);
}
copyFileSync(index, fallback);
console.log("copy-spa-fallback: wrote dist/404.html");
