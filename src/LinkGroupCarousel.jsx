import React, { useRef } from "react";
import LinkCard from "./LinkCard.jsx";

const LinkGroupCarousel = ({ links = [], theme, onLinkClick }) => {
  const scrollRef = useRef(null);

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

  if (!links.length) return null;

  return (
    <div className="w-full -mx-1 px-1 mb-1">
      <div
        ref={scrollRef}
        onWheel={handleWheelScroll}
        className="flex items-start gap-3 overflow-x-auto pb-1 snap-x snap-mandatory overscroll-x-contain"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {links.map((link) => (
          <div
            key={link._id}
            className="w-[152px] sm:w-[168px] shrink-0 snap-start"
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
