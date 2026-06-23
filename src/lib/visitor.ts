const VISITOR_KEY = "visitor_id_v1";

// Returns a stable per-browser visitor id, creating one on first call.
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

// Fire-and-forget: record that this visitor reached a given step.
export function trackStep(
  step: number,
  extra?: { email?: string; country?: string }
) {
  const visitorId = getVisitorId();
  if (!visitorId) return;
  try {
    const body = JSON.stringify({ visitorId, step, ...extra });
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
