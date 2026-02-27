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

  const role = data.role ?? "user";

  return role === "admin" ? <AdminApp /> : <UserDashboard me={data} />;
}
