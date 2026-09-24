/**
 * Registry of permanently deleted article slugs (HTTP 410 Gone)
 * and mapped 301 replacements.
 */

export const DELETED_SLUGS: string[] = [
  'vehicles-shane-van-gisbergen-on-difference-between-racing-supercars-and-nascar',
  'faltu-engineers-ep01-desi-dan-bilzenian',
  'attendance-system-smart-emp-lets-explore',
  'restoring-your-core-strength-after-pregnancy-a-gradual-and-safe-approach'
];

export const DELETED_PREFIXES: string[] = [
  'vehicles-'
];

export const MAPPED_REDIRECTS: Record<string, string> = {};

/**
 * Checks if a given URL path is a confirmed permanently deleted article.
 */
export function isPermanentlyDeletedUrl(pathname: string): boolean {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (DELETED_SLUGS.includes(clean)) return true;
  return DELETED_PREFIXES.some(prefix => clean.startsWith(prefix));
}

/**
 * Checks if a given URL path has a mapped 301 replacement target.
 */
export function getReplacementRedirect(pathname: string): string | null {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  return MAPPED_REDIRECTS[clean] || null;
}
