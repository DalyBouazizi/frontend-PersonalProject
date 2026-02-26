import { useEffect, useState } from "react";
import { fetchMe } from "../api/me";
import UserDashboard from "./UserDashboard";
import AdminApp from "./admin/AdminApp";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    fetchMe()
      .then(setData)
      .catch(() => setErr("not_logged_in"));
  }, []);

  if (err === "not_logged_in") return ((window.location.href = "/login"), null);

  if (!data) return <div style={{ padding: 24 }}>Loading...</div>;

  // NOTE: right now backend /api/me doesn't return role.
  // Add role into /api/me response by reading user_roles and include it.
  // For now, default to user dashboard.
  const role = data.role ?? "user";
  console.log("User role:", role);
  console.log("Full /api/me response:", data);
  return role === "admin" ? <AdminApp /> : <UserDashboard me={data} />;
}
