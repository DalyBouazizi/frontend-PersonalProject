import React from "react";
import { authClient } from "../auth/client";
import { updateProfile, getProfile } from "../api/profile";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  // Profile fields for registration
  const [fullName, setFullName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [adress, setAdress] = React.useState("");

  const [mode, setMode] = React.useState<"login" | "register">("login");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        // Login flow
        await authClient.signIn.email({ email, password });
        
        // Check if user has a profile after login
        const session = await authClient.getSession();
        const userId = session?.data?.user?.id;
        
        if (userId) {
          const profile = await getProfile(userId);
          
          // If no profile exists, redirect to profile setup
          if (!profile) {
            localStorage.setItem("pending_profile_setup", userId);
            window.location.href = "/profile-setup";
            return;
          }
        }
        
        window.location.href = "/";
      } else {
        // Registration flow
        // Step 1: Register user first
        await authClient.signUp.email({ email, password, name });

        // Step 2: Sign in to get session and user ID
        await authClient.signIn.email({ email, password });

        // Step 3: Fetch the current user session to get the user ID
        const session = await authClient.getSession();
        const userId = session?.data?.user?.id;

        if (!userId) {
          throw new Error("Failed to get user ID after registration");
        }

        // Step 4: Create the profile with the user ID
        try {
          await updateProfile(userId, { fullName, age, bio, adress });
          
          // Step 5: Verify profile was created successfully
          const createdProfile = await getProfile(userId);
          
          if (!createdProfile) {
            // Profile creation failed silently, save userId and redirect to setup
            localStorage.setItem("pending_profile_setup", userId);
            setError("Profile creation incomplete. Redirecting to profile setup...");
            setTimeout(() => {
              window.location.href = "/profile-setup";
            }, 2000);
            return;
          }
        } catch (profileError: any) {
          // Profile creation failed, save userId for retry
          localStorage.setItem("pending_profile_setup", userId);
          console.error("Profile creation error:", profileError);
          setError(
            `Account created but profile failed: ${profileError.message}. Redirecting to profile setup...`
          );
          setTimeout(() => {
            window.location.href = "/profile-setup";
          }, 2000);
          return;
        }

        window.location.href = "/";
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>

      <form
        style={{ display: "grid", gap: 8, maxWidth: 400 }}
        onSubmit={onSubmit}
      >
        {mode === "register" && (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Name"
              required
            />

            <hr
              style={{
                margin: "8px 0",
                border: "none",
                borderTop: "1px solid #ddd",
              }}
            />
            <h3 style={{ margin: "8px 0", fontSize: 16 }}>
              Profile Information
            </h3>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Full Name *"
              required
            />

            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              placeholder="Age *"
              required
            />

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio *"
              rows={3}
              required
              style={{ padding: 8, fontFamily: "inherit" }}
            />

            <input
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              type="text"
              placeholder="Address *"
              required
            />
          </>
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Working..." : mode === "login" ? "Login" : "Register"}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
        >
          Switch to {mode === "login" ? "Register" : "Login"}
        </button>

        {error && <div style={{ color: "crimson" }}>{error}</div>}
      </form>
    </div>
  );
}
