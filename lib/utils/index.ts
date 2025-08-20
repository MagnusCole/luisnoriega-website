// Pure utility helpers (no React imports)
// Keep functions small and easily testable

/**
 * Join class names safely.
 */
export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
