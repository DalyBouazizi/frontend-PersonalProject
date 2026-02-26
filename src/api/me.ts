export async function fetchMe() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Not logged in");
  return res.json();
}
