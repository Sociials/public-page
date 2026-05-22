import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * Instagram-style highlight bubbles for profile pages.
 */
export default function HighlightsRow({
  items = [],
  title,
  textClass = "",
  themeFontFamily = {},
  accentColor = "#15F5BA",
  ringClassName = "",
  size = "md",
  onItemClick,
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sizeConfig =
    size === "sm"
      ? { ring: 52, gap: "gap-4", label: "text-[9px] w-14" }
      : { ring: 64, gap: "gap-5", label: "text-[10px] w-[4.5rem]" };

  const updateScrollHints = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollHints();
    const el = scrollRef.current;
    if (!el) return undefined;

    const observer = new ResizeObserver(updateScrollHints);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length, updateScrollHints]);

  const handleWheelScroll = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    const isScrollingRight = e.deltaY > 0;
    const isScrollingLeft = e.deltaY < 0;
    const atLeftEdge = container.scrollLeft <= 0;
    const atRightEdge =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

    if (isScrollingLeft && atLeftEdge) return;
    if (isScrollingRight && atRightEdge) return;

    e.preventDefault();
    container.scrollLeft += e.deltaY;
  };

  if (!items.length) return null;

  const ringStyle = ringClassName
    ? undefined
    : {
        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc, ${accentColor})`,
      };

  return (
    <div className="w-full mt-3 mb-2 md:mt-5 md:mb-3">
      {title ? (
        <p
          style={themeFontFamily}
          className={`text-center font-bold mb-3 uppercase tracking-[0.2em] opacity-70 text-[0.6rem] md:text-[0.65rem] ${textClass}`}
        >
          {title}
        </p>
      ) : null}

      <div className="relative">
        {canScrollLeft && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-black/8 to-transparent" />
        )}
        {canScrollRight && (
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-black/8 to-transparent" />
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollHints}
          onWheel={handleWheelScroll}
          className={`flex ${sizeConfig.gap} overflow-x-auto pb-1 px-1 snap-x snap-mandatory scroll-smooth scrollbar-hide touch-pan-x ${
            items.length <= 4 ? "justify-center" : "justify-start"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <button
              key={item._id || index}
              type="button"
              onClick={() => onItemClick?.(index)}
              className={`snap-center shrink-0 flex flex-col items-center gap-1.5 group cursor-pointer transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/30`}
              aria-label={item.title || `Highlight ${index + 1}`}
            >
              <div
                className={`rounded-full p-[2.5px] shadow-sm ${ringClassName || ""}`}
                style={{
                  ...ringStyle,
                  width: sizeConfig.ring,
                  height: sizeConfig.ring,
                }}
              >
                <div className="w-full h-full rounded-full border-[2.5px] border-white bg-white overflow-hidden ring-1 ring-black/5">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title || ""}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                  )}
                </div>
              </div>

              {item.title ? (
                <span
                  style={themeFontFamily}
                  className={`${sizeConfig.label} font-semibold text-center truncate leading-tight opacity-90 group-hover:opacity-100 ${textClass}`}
                >
                  {item.title}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
