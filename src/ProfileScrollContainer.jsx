import React, { useEffect, useRef, useState } from "react";

/**
 * Owns scroll state for profile background effects so parent content
 * (link cards, feeds) does not re-render when scroll threshold changes.
 */
export default function ProfileScrollContainer({
  backgroundLayerStyle,
  backgroundOverlayStyle,
  children,
  className = "",
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {backgroundLayerStyle && (
        <>
          <div
            className="absolute inset-0 z-0 transition-all duration-500"
            style={{
              ...backgroundLayerStyle,
              filter:
                backgroundLayerStyle.filter === "none" && isScrolled
                  ? "blur(4px)"
                  : backgroundLayerStyle.filter === "blur(4px)"
                    ? "blur(8px)"
                    : backgroundLayerStyle.filter,
              transform: isScrolled
                ? "scale(1.1)"
                : backgroundLayerStyle.transform,
            }}
          />
          {backgroundOverlayStyle && (
            <div
              className="absolute inset-0 z-0 transition-all duration-500"
              style={{
                ...backgroundOverlayStyle,
                background: isScrolled
                  ? "rgba(0,0,0,0.3)"
                  : backgroundOverlayStyle.background,
              }}
            />
          )}
        </>
      )}

      <div
        className="absolute inset-0 z-10 flex min-w-0 flex-col overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const scrolled = e.target.scrollTop > 25;
          setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Defers iframe src until the embed is near the viewport.
 */
export function LazyIframe({ src, title, className = "", allow = "", allowFullScreen = false }) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || visible) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={containerRef} className={className}>
      {visible ? (
        <iframe
          src={src}
          title={title}
          allow={allow}
          allowFullScreen={allowFullScreen}
          loading="lazy"
          className="h-full w-full border-0"
        />
      ) : (
        <div className="h-full w-full bg-black/10 animate-pulse" aria-hidden="true" />
      )}
    </div>
  );
}
