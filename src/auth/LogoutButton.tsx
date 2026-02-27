import { authClient } from "./client";

export default function LogoutButton() {
  async function onLogout() {
    try {
      const anyClient = authClient as any;

      // Preferred: use authClient.signOut if provided by the auth library
      if (typeof anyClient.signOut === "function") {
        await anyClient.signOut();
        return;
      }

      // Some libs may expose signOut under different namespaces
      if (anyClient.signOut && typeof anyClient.signOut.email === "function") {
        await anyClient.signOut.email();
        return;
      }

      // Fallback: call backend logout endpoint (POST) with credentials
      await fetch(`${import.meta.env.VITE_API_URL}/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      // Redirect to login regardless
      window.location.href = "/login";
    }
  }

  return (
    <button type="button" onClick={onLogout} style={{ marginLeft: 8 }}>
      Logout
    </button>
  );
}
