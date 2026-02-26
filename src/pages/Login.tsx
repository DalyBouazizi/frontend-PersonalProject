import React from "react";
import { authClient } from "../auth/client";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await authClient.signIn.email({ email, password });
    window.location.href = "/"; // redirect after login
  }
  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    await authClient.signUp.email({ email, password, name });
    window.location.href = "/"; // redirect after register
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
      <form
        style={{ display: "grid", gap: 8, maxWidth: 320 }}
        onSubmit={onSubmit}
      >
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={onRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;
