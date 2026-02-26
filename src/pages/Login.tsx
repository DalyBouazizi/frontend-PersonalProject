import React from "react";
import { authClient } from "../auth/client";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [mode, setMode] = React.useState<"login" | "register">("login");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await authClient.signIn.email({ email, password });
      } else {
        await authClient.signUp.email({ email, password, name });
      }

      window.location.href = "/";
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Auth failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>

      <form
        style={{ display: "grid", gap: 8, maxWidth: 320 }}
        onSubmit={onSubmit}
      >
        {mode === "register" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Name"
            required
          />
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
