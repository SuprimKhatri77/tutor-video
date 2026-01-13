import Link from "next/link";

export function InvalidBlogId() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-8">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-6">
          Invalid Blog ID
        </h1>

        {/* Description */}
        <div className="space-y-4 mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            The blog URL you&apos;re trying to access contains an invalid
            identifier.
          </p>
          <p className="text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
            Blog IDs must be in a valid UUID format. Please check the URL and
            try again, or browse our blog collection to find what you&apos;re
            looking for.
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gray-300 mx-auto mb-12" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/blogs"
            className="inline-flex items-center px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <span className="tracking-wide">Browse All Blogs</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-1"
          >
            <span className="tracking-wide">Go to Homepage</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            Example of a valid blog URL:{" "}
            <code className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs font-mono">
              /blogs/550e8400-e29b-41d4-a716-446655440000
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
