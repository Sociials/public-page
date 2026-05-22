import React from "react";

/**
 * Segmented Links / Shop control for public profile pages.
 */
export default function ShopViewToggle({
  viewMode = "links",
  onChange,
  size = "md",
  className = "",
}) {
  const isCompact = size === "sm";

  return (
    <div className={`flex justify-center w-full ${className}`}>
      <div
        className={`relative inline-flex items-center rounded-full border-2 border-black bg-white p-1 shadow-[4px_4px_0px_rgba(0,0,0,0.12)] ${
          isCompact ? "min-w-[168px]" : "min-w-[220px]"
        }`}
        role="tablist"
        aria-label="Profile content"
      >
        <span
          aria-hidden="true"
          className={`absolute top-1 bottom-1 rounded-full bg-black transition-all duration-300 ease-out ${
            viewMode === "shop" ? "left-1/2 right-1" : "left-1 right-1/2"
          }`}
        />

        {["links", "shop"].map((mode) => {
          const active = viewMode === mode;
          return (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange?.(mode)}
              className={`relative z-10 flex-1 rounded-full font-black uppercase tracking-[0.18em] transition-colors duration-200 ${
                isCompact ? "px-4 py-1.5 text-[0.55rem]" : "px-7 py-2.5 text-[0.7rem] md:text-xs"
              } ${active ? "text-white" : "text-gray-500 hover:text-gray-800"}`}
            >
              {mode === "links" ? "Links" : "Shop"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
