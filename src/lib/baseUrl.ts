/** Vite `base`, e.g. `/` locally or `/my-repo/` on GitHub Pages */
const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** Build an absolute-from-root app URL (handles GitHub Pages subpath). */
export function withBase(path: string): string {
  const p = path.replace(/^\/+/, "");
  if (!p) return base;
  return `${base}${p}`.replace(/\/{2,}/g, "/");
}

/** Current `location.pathname` without the Vite base prefix (for client routing). */
export function stripBasePathname(pathname: string): string {
  const baseNoSlash = base.replace(/\/+$/, "") || "";
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (!baseNoSlash) return normalized;
  if (normalized === baseNoSlash) return "/";
  if (normalized.startsWith(`${baseNoSlash}/`)) {
    const rest = normalized.slice(baseNoSlash.length);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return normalized;
}
