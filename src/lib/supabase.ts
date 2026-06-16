// Saves user data via server-side API route (uses service role key, bypasses RLS)
export async function saveUser({
  email,
  country,
  quizAnswers,
}: {
  email: string;
  country?: string;
  quizAnswers?: Record<string, unknown>;
}) {
  try {
    const res = await fetch("/api/save-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, country, quizAnswers }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("saveUser error:", data.error);
      return null;
    }
    return data.id as string;
  } catch (err) {
    console.error("saveUser fetch error:", err);
    return null;
  }
}
