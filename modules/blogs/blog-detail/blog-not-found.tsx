import Link from "next/link";

export function BlogNotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-light text-gray-900 mb-4">Blog not found</h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
        The article you&aapos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Link
        href="/blogs"
        className="inline-flex items-center text-black border-b-2 border-black pb-1 hover:opacity-60 transition-opacity"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="tracking-wide">Back to Blog</span>
      </Link>
    </div>
  );
}
