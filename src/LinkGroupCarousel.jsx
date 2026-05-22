import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LinkCard from "./LinkCard.jsx";

const CARD_WIDTH_PX = 152;
const CARD_WIDTH_SM_PX = 168;
const CARD_GAP_PX = 12;

const LinkGroupCarousel = ({ links = [], theme, onLinkClick }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [fitsInView, setFitsInView] = useState(true);
  const [scrollPadding, setScrollPadding] = useState("0px");

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const overflow = maxScroll > 4;

    setFitsInView(!overflow);
    setCanScrollLeft(container.scrollLeft > 4);
    setCanScrollRight(container.scrollLeft < maxScroll - 4);

    const cardWidth =
      container.clientWidth >= 640 ? CARD_WIDTH_SM_PX : CARD_WIDTH_PX;
    setScrollPadding(overflow ? `calc(50% - ${cardWidth / 2}px)` : "0px");
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return undefined;

    updateScrollState();

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      const isScrollingRight = e.deltaY > 0;
      const isScrollingLeft = e.deltaY < 0;
      const atLeftEdge = container.scrollLeft <= 0;
      const atRightEdge = container.scrollLeft >= maxScroll - 1;

      if (isScrollingLeft && atLeftEdge) return;
      if (isScrollingRight && atRightEdge) return;

      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("scroll", updateScrollState, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", updateScrollState);

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateScrollState);
      observer.disconnect();
    };
  }, [links.length, updateScrollState]);

  const scrollBy = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === "left" ? -(CARD_WIDTH_PX + CARD_GAP_PX) : CARD_WIDTH_PX + CARD_GAP_PX,
      behavior: "smooth",
    });
  };

  if (!links.length) return null;

  return (
    <div className="relative group/carousel w-full min-w-0 mb-1">
      {!fitsInView && canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy("left")}
          className="absolute left-0 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white/90 opacity-0 shadow-md transition-opacity group-hover/carousel:opacity-100"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-[10px] text-gray-700" />
        </button>
      )}

      {!fitsInView && canScrollRight && (
        <button
          type="button"
          onClick={() => scrollBy("right")}
          className="absolute right-0 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white/90 opacity-0 shadow-md transition-opacity group-hover/carousel:opacity-100"
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-[10px] text-gray-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className={`flex min-w-0 items-start gap-3 overflow-x-auto overscroll-x-contain pb-1 scroll-smooth touch-pan-x [&::-webkit-scrollbar]:hidden ${
          fitsInView ? "justify-center" : "snap-x snap-mandatory"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollPaddingInline: scrollPadding,
        }}
      >
        {links.map((link) => (
          <div
            key={link._id}
            className={`w-[152px] shrink-0 sm:w-[168px] ${fitsInView ? "" : "snap-center"}`}
          >
            <LinkCard
              link={link}
              theme={theme}
              layout="carousel"
              onClick={() => onLinkClick?.(link)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkGroupCarousel;
