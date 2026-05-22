import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";

const STORY_DURATION_MS = 5000;

export default function StoryViewer({
  stories = [],
  startIndex = 0,
  onClose,
  accentColor = "#15F5BA",
  ctaTextColor = "#000000",
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [progressKey, setProgressKey] = useState(0);
  const story = stories[currentIndex];

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    if (!story) return undefined;

    const timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setProgressKey((prev) => prev + 1);
      } else {
        onClose?.();
      }
    }, STORY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [currentIndex, story, stories.length, onClose]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgressKey((prev) => prev + 1);
    } else {
      onClose?.();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgressKey((prev) => prev + 1);
    }
  };

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black md:bg-black/90 md:backdrop-blur-md flex items-center justify-center md:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-y-0 left-0 w-1/3 z-40" onClick={handlePrev} aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-1/3 z-40" onClick={handleNext} aria-hidden="true" />

      <div className="relative w-full h-[100dvh] md:h-auto md:max-w-md md:aspect-[9/16] md:max-h-[90vh] bg-black md:rounded-2xl overflow-hidden md:shadow-2xl flex flex-col pointer-events-none">
        <div className="absolute top-0 left-0 right-0 px-3 pt-3 md:pt-4 flex gap-1 z-50">
          {stories.map((_, idx) => (
            <div
              key={`${idx}-${progressKey}`}
              className="h-[3px] flex-1 bg-white/25 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white origin-left rounded-full ${
                  idx < currentIndex
                    ? "w-full"
                    : idx === currentIndex
                      ? "animate-[story-progress_5s_linear_forwards] w-full"
                      : "w-0"
                }`}
                style={
                  idx === currentIndex
                    ? { animationDuration: `${STORY_DURATION_MS}ms` }
                    : undefined
                }
              />
            </div>
          ))}
        </div>

        <div className="absolute top-8 md:top-10 left-0 right-0 px-4 flex items-start justify-between z-[60] pointer-events-auto">
          {story.title ? (
            <p className="text-white font-bold text-sm md:text-base drop-shadow-md truncate pr-4 max-w-[75%]">
              {story.title}
            </p>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1.5 -mr-1 rounded-full hover:bg-white/10"
            aria-label="Close story"
          >
            <FaTimes className="w-5 h-5 drop-shadow-md" />
          </button>
        </div>

        <img
          key={story.image}
          src={story.image}
          alt={story.title || "Highlight"}
          className="w-full h-full object-cover pointer-events-auto"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-5 pb-8 md:pb-6 flex flex-col items-center text-center z-50 pointer-events-auto">
          {story.link ? (
            <a
              href={story.link}
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-xs font-black uppercase tracking-widest py-3.5 md:py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg text-sm md:text-base border-2 border-black"
              style={{
                backgroundColor: accentColor,
                color: ctaTextColor,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Visit Link <FaExternalLinkAlt size={12} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
