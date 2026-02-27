import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { Routes, Route, Link } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { List, Edit } from "./screens";
import LogoutButton from "../../auth/LogoutButton";

export default function AdminApp() {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api`;

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const dpCreds = dataProvider(apiUrl, axiosInstance);

  return (
    <>
      <div
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/users" style={{ textDecoration: "none" }}>
          <button type="button">📋 Users List</button>
        </Link>
        <LogoutButton />
      </div>

      <Refine
        dataProvider={dpCreds}
        routerProvider={routerProvider}
        resources={[{ name: "users", list: "/users", edit: "/users/:id" }]}
      >
        <Routes>
          <Route path="/users" element={<List />} />
          <Route path="/users/:id" element={<Edit />} />
        </Routes>
      </Refine>
    </>
  );
}
