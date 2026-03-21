/**
 * One hit per full page load (SPA in-app navigation does not re-call).
 * Only runs in production; requires visit.php on the host (from public/).
 */
export function recordVisit(): void {
  if (!import.meta.env.PROD) {
    return;
  }

  void fetch("/visit.php", {
    method: "POST",
    credentials: "same-origin",
    keepalive: true,
  });
}
