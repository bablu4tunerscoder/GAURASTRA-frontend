export default function ProductCardSkeleton() {
  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
      <div className="h-56 w-full bg-gray-200 animate-pulse" />

      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />

        <div className="flex gap-2">
          <div className="h-4 w-12 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-10 bg-gray-200 animate-pulse rounded" />
        </div>

        <div className="h-8 w-full bg-gray-200 animate-pulse rounded-md" />
      </div>
    </div>
  );
}
