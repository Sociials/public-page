import React, { useState, useRef, useEffect } from "react";
import { FaInstagram, FaPlay, FaClone, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-3 gap-1.5 w-full max-w-md mt-8 px-2">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="aspect-square rounded-xl bg-gray-200 animate-pulse"
        style={{ animationDelay: `${i * 100}ms` }}
      />
    ))}
  </div>
);

const MediaBadge = ({ type }) => {
  if (type === "VIDEO") {
    return (
      <div className="absolute top-2 right-2 text-white drop-shadow-lg">
        <FaPlay className="text-[10px]" />
      </div>
    );
  }
  if (type === "CAROUSEL_ALBUM") {
    return (
      <div className="absolute top-2 right-2 text-white drop-shadow-lg">
        <FaClone className="text-[10px]" />
      </div>
    );
  }
  return null;
};

const PostItem = ({ post, isCompact }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgSrc = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square block overflow-hidden rounded-xl bg-gray-100 border-2 border-transparent hover:border-black/20 transition-all"
    >
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      <img
        src={imgSrc || post.media_url}
        alt={post.caption?.substring(0, 60) || "Instagram post"}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgLoaded(true)}
      />

      <MediaBadge type={post.media_type} />

      {!isCompact && post.caption && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2.5">
          <p className="text-white text-[10px] leading-snug line-clamp-3 font-medium">
            {post.caption}
          </p>
        </div>
      )}
    </a>
  );
};

const CarouselLayout = ({ posts }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, [posts]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.65;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel w-full">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity border border-gray-100"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-[10px] text-gray-700" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity border border-gray-100"
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-[10px] text-gray-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="snap-start shrink-0 w-[130px] h-[130px] sm:w-[150px] sm:h-[150px]"
          >
            <PostItem post={post} isCompact />
          </div>
        ))}
      </div>
    </div>
  );
};

/** Renders Instagram posts from page.integrations.instagram.cachedFeed (set by API). */
const InstagramFeed = ({ user }) => {
  const ig = user?.integrations?.instagram;
  const enabled = ig?.feedSettings?.enabled ?? true;

  if (!ig?.connected || !enabled) return null;

  const posts = ig.cachedFeed || [];
  const layout = ig.feedSettings?.layout || "grid";
  const igUsername = ig.username || user?.username;
  const needsReconnect = ig.tokenExpiresAt && new Date(ig.tokenExpiresAt) < new Date();

  if (posts.length === 0 && !needsReconnect) return null;

  return (
    <div className="w-full max-w-md mt-8 px-2 flex flex-col items-center">
      <div className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm w-full">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center shadow-sm">
            <FaInstagram className="text-white text-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <a
              href={`https://instagram.com/${igUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-gray-900 hover:underline truncate block"
            >
              @{igUsername}
            </a>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
              Latest Posts
            </p>
          </div>
          <a
            href={`https://instagram.com/${igUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#E4405F] hover:text-[#c13584] transition-colors px-3 py-1.5 border border-[#E4405F]/20 rounded-xl hover:bg-[#E4405F]/5"
          >
            Follow
          </a>
        </div>

        <div className="p-3">
          {needsReconnect && posts.length === 0 ? (
            <div className="text-center py-4 px-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-700 text-xs font-medium">
              Feed connection expired. Reconnect in Settings.
            </div>
          ) : (
            <>
              {needsReconnect && (
                <div className="mb-2 text-[9px] text-amber-600 bg-amber-50/80 rounded-lg px-2 py-1.5 text-center font-bold tracking-wide uppercase">
                  Showing cached posts — refresh needed
                </div>
              )}
              {layout === "carousel" ? (
                <CarouselLayout posts={posts} />
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {posts.length > 0 && (
          <a
            href={`https://instagram.com/${igUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 border-t border-gray-50 text-xs font-bold text-gray-400 hover:text-[#E4405F] transition-colors"
          >
            View on Instagram →
          </a>
        )}
      </div>
    </div>
  );
};

export default InstagramFeed;
