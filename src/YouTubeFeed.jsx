import React, { useState, useRef } from "react";
import { FaYoutube, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const VideoCard = ({ video, isLarge = false }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-2xl border border-gray-200/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md w-full ${
        isLarge ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-video"
      }`}
    >
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={video.thumbnail}
        alt={video.title}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgLoaded(true)}
      />
      
      {/* Subtle dark gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Text positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-left">
        <p className={`font-bold text-white leading-tight drop-shadow-sm ${
          isLarge ? "text-sm sm:text-base line-clamp-2" : "text-[11px] line-clamp-2"
        }`}>
          {video.title}
        </p>
      </div>
    </a>
  );
};

const CarouselLayout = ({ videos }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full group/nav">
      <button
        onClick={() => scroll("left")}
        className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all opacity-0 group-hover/nav:opacity-100"
      >
        <FaChevronLeft className="text-xs" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-3 px-1 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video) => (
          <div key={video.id} className="w-[180px] shrink-0 snap-center flex flex-col">
            <VideoCard video={video} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all opacity-0 group-hover/nav:opacity-100"
      >
        <FaChevronRight className="text-xs" />
      </button>
    </div>
  );
};

const YouTubeFeed = ({ user }) => {
  const fullFeed = user?.integrations?.youtube?.cachedFeed || [];
  const layout = user?.integrations?.youtube?.feedSettings?.layout || "grid";
  const maxPosts = user?.integrations?.youtube?.feedSettings?.maxPosts || 4;
  const enabled = user?.integrations?.youtube?.feedSettings?.enabled ?? true;

  if (!user?.integrations?.youtube?.connected || fullFeed.length === 0 || !enabled) return null;

  const videos = fullFeed.slice(0, maxPosts);

  return (
    <div className="w-full max-w-md mt-5 px-4 flex flex-col items-center">
      {/* Small minimalist header */}
      <div className="flex items-center gap-1.5 self-start mb-2.5 opacity-75">
        <FaYoutube className="text-red-600 text-sm" />
        <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500">
          {user?.integrations?.youtube?.channelTitle || "YouTube Feed"}
        </span>
      </div>

      {videos.length === 1 ? (
        <VideoCard video={videos[0]} isLarge={true} />
      ) : layout === "carousel" ? (
        <CarouselLayout videos={videos} />
      ) : (
        <div className="grid grid-cols-2 gap-3 w-full">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeFeed;
