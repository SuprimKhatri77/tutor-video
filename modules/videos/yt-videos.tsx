"use client";
import { CSSProperties, useEffect, useState } from "react";
import { Play, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { VideoSkeleton } from "./video-skeleton";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
  published: string;
}

export default function YoutubeGallery() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/youtube/rss")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;
  const canShowLess = visibleCount > 6;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, videos.length));
  };

  const handleShowLess = () => {
    setVisibleCount(6);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .video-card {
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: calc(var(--index) * 0.1s);
          opacity: 0;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center my-16 md:my-20">
          {/* Note put type writer animation on video lesson text */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          Learn <span className="bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent ">German</span> Faster with My
         <span className="block     ">
          Videos
        </span>
        </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Master the German language and unlock opportunities. Expert guidance
            for your journey to Germany.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-black"></div>
            <span className="text-sm tracking-widest text-gray-400 uppercase">
              Latest Content
            </span>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-black"></div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <VideoSkeleton key={index} index={index} />
              ))
            : visibleVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="video-card group"
                  style={{ "--index": index } as CSSProperties}
                  onMouseEnter={() => setHoveredId(video.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:border-black hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2">
                    {/* Thumbnail Container */}
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      {playingVideo === video.id ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0"
                        ></iframe>
                      ) : (
                        <>
                          <Image
                            fill
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          {/* Overlay */}
                          <div
                            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                              hoveredId === video.id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <button
                              onClick={() => setPlayingVideo(video.id)}
                              className="flex items-center justify-center w-16 h-16 rounded-full bg-black text-white transition-transform duration-300 hover:scale-110"
                            >
                              <Play
                                className="w-6 h-6 ml-1"
                                fill="currentColor"
                              />
                            </button>
                          </div>

                          {/* Corner accent */}
                          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-base md:text-lg leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-3 tracking-wide">
                        {new Date(video.published).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Action Buttons */}
        {!loading && (
          <div className="flex flex-col items-center gap-4">
            {hasMore && (
              <button
                onClick={handleLoadMore}
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Load More Videos
                  <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1 ease-linear" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            )}

            {canShowLess && (
              <button
                onClick={handleShowLess}
                className="px-6 py-3 text-sm text-gray-500 border border-gray-300 rounded-lg hover:text-black hover:border-black transition-all duration-300 flex items-center gap-2"
              >
                Show Less
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Stats or additional info */}
        {!loading && (
          <div className="mt-20 pt-12 border-t border-gray-200 text-center">
            <p className="text-gray-400 text-sm tracking-wide">
              {videos.length} videos • Updated regularly with new content
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
