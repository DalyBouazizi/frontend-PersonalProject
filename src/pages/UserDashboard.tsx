export default function UserDashboard({ me }: { me: any }) {
  return (
    <div style={{ padding: 24 }}>
      <h2>User Dashboard</h2>
      <div>
        <b>Email:</b> {me.user?.email}
      </div>
      <div>
        <b>Role:</b> {me.role}
      </div>

      <h3 style={{ marginTop: 16 }}>Profile</h3>
      <pre>{JSON.stringify(me.profile, null, 2)}</pre>

      <h3 style={{ marginTop: 16 }}>My items</h3>
      <pre>{JSON.stringify(me.items, null, 2)}</pre>
    </div>
  );
}
