export default function Info({ label, value }) {
  return (
    <div className="flex flex-col shadow p-4 rounded-md bg-gray-100">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
