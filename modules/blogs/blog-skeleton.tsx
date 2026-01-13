export function BlogSkeleton({ index }: { index: number }) {
  return (
    <article className="relative animate-pulse">
      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Content Skeleton */}
        <div className={`md:col-span-7 ${index % 2 === 1 ? "md:order-2" : ""}`}>
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="mt-4 space-y-3">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
          <div className="mt-6 space-y-2">
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="mt-8 h-6 w-32 bg-gray-200 rounded" />
        </div>

        {/* Image Skeleton */}
        <div className={`md:col-span-5 ${index % 2 === 1 ? "md:order-1" : ""}`}>
          <div className="aspect-4/3 bg-gray-200 rounded" />
        </div>
      </div>
    </article>
  );
}
