import { useState } from "react";
import LogoutButton from "../auth/LogoutButton";
import { updateProfile } from "../api/profile";

export default function UserDashboard({ me }: { me: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(me.profile?.fullName || "");
  const [age, setAge] = useState(me.profile?.age || "");
  const [bio, setBio] = useState(me.profile?.bio || "");
  const [adress, setAdress] = useState(me.profile?.adress || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await updateProfile(me.user.id, { fullName, age, bio, adress });
      setSuccess(true);
      setIsEditing(false);
      // Refresh the page to show updated data
      setTimeout(() => window.location.reload(), 1000);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>User Dashboard</h2>
        <LogoutButton />
      </div>

      <div style={{ marginTop: 16 }}>
        <b>Email:</b> {me.user?.email}
      </div>
      <div>
        <b>Role:</b> {me.role}
      </div>

      <h3 style={{ marginTop: 24, marginBottom: 8 }}>Profile</h3>

      {!isEditing ? (
        <div>
          <div style={{ marginBottom: 8 }}>
            <b>Full Name:</b> {me.profile?.fullName || "N/A"}
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Age:</b> {me.profile?.age || "N/A"}
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Bio:</b> {me.profile?.bio || "N/A"}
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Address:</b> {me.profile?.adress || "N/A"}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginTop: 16, padding: "8px 16px" }}
          >
            ✏️ Edit Profile
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: 500 }}>
          <div style={{ marginBottom: 12 }}>
            <label
              style={{ display: "block", marginBottom: 4, fontWeight: 500 }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label
              style={{ display: "block", marginBottom: 4, fontWeight: 500 }}
            >
              Age
            </label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label
              style={{ display: "block", marginBottom: 4, fontWeight: 500 }}
            >
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label
              style={{ display: "block", marginBottom: 4, fontWeight: 500 }}
            >
              Address
            </label>
            <input
              type="text"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          {error && (
            <div
              style={{
                color: "crimson",
                padding: 8,
                background: "#fee",
                marginBottom: 12,
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                color: "green",
                padding: 8,
                background: "#efe",
                marginBottom: 12,
              }}
            >
              Profile updated successfully!
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                padding: "8px 16px",
                background: loading ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Saving..." : "💾 Save"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setError("");
                setSuccess(false);
                // Reset form fields
                setFullName(me.profile?.fullName || "");
                setAge(me.profile?.age || "");
                setBio(me.profile?.bio || "");
                setAdress(me.profile?.adress || "");
              }}
              disabled={loading}
              style={{ padding: "8px 16px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: 24 }}>My items</h3>
      <pre>{JSON.stringify(me.items, null, 2)}</pre>
    </div>
  );
}
