export function BlogDetailSkeleton() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-16 animate-pulse">
      {/* Meta Skeleton */}
      <div className="border-l-2 border-gray-300 pl-6 mb-12">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded mt-2" />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-12 bg-gray-200 rounded w-3/4" />
        <div className="h-12 bg-gray-200 rounded w-full" />
      </div>

      {/* Description Skeleton */}
      <div className="mb-16 pb-16 border-b border-gray-200">
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-full" />
          <div className="h-6 bg-gray-200 rounded w-full" />
          <div className="h-6 bg-gray-200 rounded w-4/5" />
        </div>
      </div>

      {/* Image Skeleton */}
      <div className="mb-16">
        <div className="aspect-video bg-gray-200 rounded" />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </article>
  );
}
