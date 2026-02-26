import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { List, Edit } from "./screens";

export default function AdminApp() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const dpCreds = dataProvider(apiUrl, axiosInstance);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
