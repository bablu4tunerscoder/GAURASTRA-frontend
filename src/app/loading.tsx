

export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full animate-ping"></div>
          <div className="absolute inset-2 border-4 border-indigo-400 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

