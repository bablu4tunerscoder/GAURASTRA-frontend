import Info from "./Info";

export default function ProfileTab({ user }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Profile Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Name" value={user?.name} />
        <Info label="Email" value={user?.email} />
        <Info label="Phone" value={user?.phone === "0" ? "Not Set" : user?.phone} />
        <Info label="Member Since" value={user?.createdAt?.split("T")[0]} />
      </div>
    </div>
  );
}
