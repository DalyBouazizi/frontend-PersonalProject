import { useState } from "react";
import { updateProfile } from "../api/profile";

export default function ProfileSetup({ userId }: { userId: string }) {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [adress, setAdress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await updateProfile(userId, { fullName, age, bio, adress });
      // Redirect to home after successful profile creation
      window.location.href = "/";
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: "0 auto" }}>
      <h2>Complete Your Profile</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Please fill in your profile information to continue.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Full Name *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Age *
          </label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
            placeholder="25"
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Bio *
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            rows={4}
            style={{ width: "100%", padding: 8 }}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Address *
          </label>
          <input
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
            placeholder="123 Main St, City, Country"
          />
        </div>

        {error && (
          <div style={{ color: "crimson", padding: 8, background: "#fee" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            fontSize: 16,
            background: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
