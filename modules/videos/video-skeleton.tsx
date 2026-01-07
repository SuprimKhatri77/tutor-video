export function VideoSkeleton({ index }: { index: number }) {
  return (
    <div
      className="video-card animate-pulse"
      style={{ "--index": index } as any}
    >
      <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        {/* Thumbnail Skeleton */}
        <div className="relative aspect-video bg-gray-200"></div>

        {/* Content Skeleton */}
        <div className="p-5">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
