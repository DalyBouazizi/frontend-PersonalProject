import { useList, useUpdate, useOne } from "@refinedev/core";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

export function List() {
  const { query, result } = useList({ resource: "users" });

  if (query.isLoading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (query.error) return <div style={{ padding: 24 }}>Error</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Users (Roles)</h2>
      <ul>
        {result?.data?.map((u: any) => (
          <li key={u.id}>
            {u.name} || {u.email} || ({u.id}) || {u.role} — —
            <Link to={`/users/${u.id}`}>Edit Role</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Edit() {
  const { id } = useParams();
  const { query: oneQuery } = useOne({ resource: "users", id: id! });
  const { mutate } = useUpdate();

  const [role, setRole] = useState<string>(oneQuery.data?.data?.role ?? "user");

  function onSave() {
    mutate({
      resource: "users",
      id: id!,
      values: { role },
    });
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Edit Role</h2>
      <div>UserId: {id}</div>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
      <button onClick={onSave} style={{ marginLeft: 8 }}>
        Save
      </button>
    </div>
  );
}
