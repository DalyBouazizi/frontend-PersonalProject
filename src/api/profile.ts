const API_URL = import.meta.env.VITE_API_URL;

export async function getProfile(userId: string) {
  const res = await fetch(`${API_URL}/api/user-profiles/${userId}`, {
    credentials: "include",
  });
  if (!res.ok) {
    if (res.status === 404) {
      return null; // Profile doesn't exist yet
    }
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

export async function updateProfile(
  userId: string,
  data: { fullName: string; age: string; bio: string; adress: string },
) {
  const res = await fetch(`${API_URL}/api/user-profiles/${userId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}
